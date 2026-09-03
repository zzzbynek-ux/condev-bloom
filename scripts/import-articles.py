#!/usr/bin/env python3
"""Import posts from jednimhlasem.cz WP REST into src/data/articles.json."""
from __future__ import annotations

import json
import os
import re
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path

BASE = "https://jednimhlasem.cz/wp-json/wp/v2"
AUTH = (os.environ.get("WP_USER","") , os.environ.get("WP_PASS",""))
ROOT = Path("/workspace")
OUT = ROOT / "src/data/articles.json"
IMG_DIR = ROOT / "public/images/articles"
CSV = ROOT / "attachments/Seznam štítků(List1).csv"

CZECH_RE = re.compile(
    r"\b(česk|čech|praha|praž|brno|morav|brněn|plzeň|ostrav|zeman|pavel|fiala|"
    r"sněmovn|senát|ods\b|ano\b|pirát|spd\b|stan\b)\b",
    re.I,
)
STUDY_RE = re.compile(
    r"\b(analýz|studie|report|data|statistik|průzkum|výzkum|graf)\b",
    re.I,
)

ALIASES = {
    "antisemitismus": ["antisemit", "židoboj", "jew-hat"],
    "antisionismus": ["antision", "anti-zion"],
    "holocaust": ["šoa", "shoah", "osvětim", "auschwitz"],
    "dezinformace": ["dezinfo", "fake news", "hoax"],
    "hamás": ["hamas"],
    "gaza": ["gazy", "gaze"],
    "média": ["mediáln", "novinář", "redakc"],
    "katar": ["qatar"],
    "sionismus": ["sionist"],
}


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def text(self) -> str:
        return re.sub(r"\s+", " ", "".join(self.parts)).strip()


def strip_html(html: str) -> str:
    p = TextExtractor()
    try:
        p.feed(html or "")
    except Exception:
        return re.sub(r"<[^>]+>", " ", html or "")
    return p.text()


def wp_get(path: str, params: dict | None = None) -> object:
    q = f"?{urllib.parse.urlencode(params)}" if params else ""
    url = f"{BASE}{path}{q}"
    req = urllib.request.Request(url)
    token = urllib.parse.quote(f"{AUTH[0]}:{AUTH[1]}")
    # basic auth
    import base64

    req.add_header("Authorization", "Basic " + base64.b64encode(f"{AUTH[0]}:{AUTH[1]}".encode()).decode())
    req.add_header("User-Agent", "JednimHlasemImporter/1.0")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def load_tags() -> list[str]:
    raw = CSV.read_text(encoding="utf-8-sig")
    tags = []
    skip = {"antisemitismus", "sionismus", "judaismus", "místa, lidé", "rubriky jh", "pod lupou", "mediální pitva", "ideologie a pojmy"}
    for line in raw.splitlines():
        t = line.strip().strip('"').strip()
        if not t or t.lower() in skip:
            continue
        if t not in tags:
            tags.append(t)
    return tags


def score_tags(title: str, body: str, catalog: list[str]) -> list[str]:
    blob = f"{title} {body}".lower()
    hits: list[tuple[int, str]] = []
    for tag in catalog:
        key = tag.lower().strip()
        n = blob.count(key)
        for a in ALIASES.get(key, []):
            n += blob.count(a)
        if n:
            hits.append((n, tag))
    hits.sort(reverse=True)
    out = [t for _, t in hits[:4]]
    return out or ["Izrael"]


def fetch_all_posts() -> list[dict]:
    posts = []
    page = 1
    while True:
        batch = wp_get(
            "/posts",
            {
                "per_page": 100,
                "page": page,
                "status": "publish",
                "_fields": "id,date,slug,title,excerpt,content,featured_media,categories,link",
            },
        )
        if not isinstance(batch, list) or not batch:
            break
        posts.extend(batch)
        print(f"page {page}: {len(batch)} (total {len(posts)})", flush=True)
        if len(batch) < 100:
            break
        page += 1
        time.sleep(0.15)
    return posts


def media_url(mid: int) -> str | None:
    if not mid:
        return None
    try:
        m = wp_get(f"/media/{mid}", {"_fields": "source_url,media_details"})
        details = (m or {}).get("media_details") or {}
        sizes = details.get("sizes") or {}
        for key in ("medium_large", "large", "medium"):
            u = (sizes.get(key) or {}).get("source_url")
            if u:
                return u
        return m.get("source_url")
    except Exception as e:
        print("media fail", mid, e)
        return None


def download_img(url: str, slug: str) -> str:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    dest = IMG_DIR / f"{slug[:80]}.jpg"
    if dest.exists() and dest.stat().st_size > 2000:
        return f"/images/articles/{dest.name}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "JednimHlasemImporter/1.0"})
        with urllib.request.urlopen(req, timeout=25) as r:
            data = r.read()
        dest.write_bytes(data)
        return f"/images/articles/{dest.name}"
    except Exception as e:
        print("img fail", slug, e)
        return "/images/articles/fallback.jpg"


def main() -> None:
    catalog = load_tags()
    posts = fetch_all_posts()
    print("posts", len(posts), flush=True)
    media_ids = {p.get("featured_media") for p in posts if p.get("featured_media")}
    media_map: dict[int, str] = {}

    def one_media(mid: int) -> tuple[int, str | None]:
        return mid, media_url(mid)

    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = [ex.submit(one_media, mid) for mid in media_ids]
        for i, f in enumerate(as_completed(futs), 1):
            mid, url = f.result()
            if url:
                media_map[mid] = url
            if i % 20 == 0:
                print(f"media {i}/{len(media_ids)}", flush=True)

    articles = []
    for p in posts:
        title = strip_html((p.get("title") or {}).get("rendered") or "")
        excerpt = strip_html((p.get("excerpt") or {}).get("rendered") or "")
        html = (p.get("content") or {}).get("rendered") or ""
        body = strip_html(html)
        slug = p.get("slug") or str(p.get("id"))
        date = (p.get("date") or "")[:10]
        tags = score_tags(title, body, catalog)
        cats = p.get("categories") or []
        sections = ["nove", "vse"]
        blob = f"{title} {excerpt} {body}"
        if CZECH_RE.search(blob) or 16 in cats:
            sections.append("cesi-a-izrael")
        if STUDY_RE.search(blob) or 9 in cats:
            sections.append("studie")
        src = media_map.get(p.get("featured_media") or 0)
        image = download_img(src, slug) if src else "/images/articles/fallback.jpg"
        articles.append(
            {
                "id": p.get("id"),
                "slug": slug,
                "title": title,
                "perex": excerpt[:280],
                "html": html,
                "date": date,
                "iso": p.get("date"),
                "tags": tags,
                "tag": tags[0] if tags else "Izrael",
                "sections": sections,
                "image": image,
                "url": p.get("link"),
            }
        )

    # newest first
    articles.sort(key=lambda a: a.get("iso") or "", reverse=True)
    # pin a few editorial to doporucujeme (community-style selection)
    for a in articles[:11]:
        if "doporucujeme" not in a["sections"]:
            a["sections"].append("doporucujeme")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(articles, ensure_ascii=False), encoding="utf-8")
    print("wrote", OUT, "n=", len(articles))


if __name__ == "__main__":
    main()
