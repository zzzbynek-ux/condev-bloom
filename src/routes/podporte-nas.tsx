import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, Flag, PenLine, Target } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type AmountKey = "301" | "901" | "2501";
type Cadence = "monthly" | "once";

const IBAN = "CZ65 2010 0000 0023 0198 7654";
const IBAN_COMPACT = "CZ6520100000002301987654";
const ACCOUNT = "2301987654 / 2010";
const MSG = "Dar JednímHlasem";

const AMOUNTS: {
  key: AmountKey;
  name: string;
  oneTimeKc: number;
  monthlyKc: number;
  vs: string;
  hold: string;
  recommended?: boolean;
}[] = [
  {
    key: "301",
    name: "Hlas",
    oneTimeKc: 300,
    monthlyKc: 150,
    vs: "301",
    hold: "jedna analýza",
  },
  {
    key: "901",
    name: "Podporovatel",
    oneTimeKc: 900,
    monthlyKc: 300,
    vs: "901",
    hold: "doporučeno",
    recommended: true,
  },
  {
    key: "2501",
    name: "Patron",
    oneTimeKc: 2500,
    monthlyKc: 800,
    vs: "2501",
    hold: "měsíc provozu",
  },
];

function formatKc(n: number) {
  return `${n.toLocaleString("cs-CZ")} Kč`;
}

function spdPayload(kc: number, vs: string) {
  return `SPD*1.0*ACC:${IBAN_COMPACT}*AM:${kc.toFixed(2)}*CC:CZK*X-VS:${vs}*MSG:Dar JednimHlasem`;
}

function scrollToQr() {
  document.getElementById("dar-qr")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Route = createFileRoute("/podporte-nas")({
  head: () => ({
    meta: [
      { title: "Podpořte nás — JednímHlasem" },
      {
        name: "description",
        content:
          "Podpořte komunitu JednímHlasem darem na provoz, analýzy a propagaci faktů o Izraeli.",
      },
      { property: "og:title", content: "Podpořte nás — JednímHlasem" },
      {
        property: "og:description",
        content:
          "Podpořte komunitu JednímHlasem darem na provoz, analýzy a propagaci faktů o Izraeli.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PodporteNas,
});

function DonateQr({ payload }: { payload: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    setSrc(null);
    setFailed(false);
    QRCode.toDataURL(payload, {
      width: 360,
      margin: 1,
      color: { dark: "#0b1a3a", light: "#ffffff" },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (live) setSrc(url);
      })
      .catch(() => {
        if (live) setFailed(true);
      });
    return () => {
      live = false;
    };
  }, [payload]);

  if (failed) {
    return (
      <div className="donate-qr-ph">
        <span>QR se nepodařilo vygenerovat. Použijte číslo účtu.</span>
      </div>
    );
  }
  if (!src) {
    return <div className="donate-qr-ph" aria-hidden="true" />;
  }
  return (
    <img
      src={src}
      alt="QR platba SPD"
      width={180}
      height={180}
      className="donate-qr-img"
      data-spd={payload}
    />
  );
}

function PodporteNas() {
  const [selected, setSelected] = useState<AmountKey>("901");
  const [cadence, setCadence] = useState<Cadence>("monthly");
  const [copied, setCopied] = useState(false);
  const amount = AMOUNTS.find((a) => a.key === selected)!;
  const kc = cadence === "monthly" ? amount.monthlyKc : amount.oneTimeKc;
  const payload = useMemo(() => spdPayload(kc, amount.vs), [kc, amount.vs]);

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(ACCOUNT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const widget = (
    <aside className="donate-widget" aria-label="Vyberte dar">
      <h2 className="font-display text-[1.15rem] font-bold text-foreground">Vyberte dar</h2>
      <div className="donate-toggle" role="tablist" aria-label="Frekvence daru">
        <button
          type="button"
          role="tab"
          aria-selected={cadence === "once"}
          className={cadence === "once" ? "on" : undefined}
          onClick={() => setCadence("once")}
        >
          Jednorázově
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={cadence === "monthly"}
          className={cadence === "monthly" ? "on" : undefined}
          onClick={() => setCadence("monthly")}
        >
          Měsíčně
        </button>
      </div>
      <div className="donate-tiers">
        {AMOUNTS.map((row) => {
          const active = selected === row.key;
          const value = cadence === "monthly" ? row.monthlyKc : row.oneTimeKc;
          return (
            <button
              key={row.key}
              type="button"
              className={`donate-tier${active ? " rec" : ""}`}
              aria-pressed={active}
              onClick={() => setSelected(row.key)}
            >
              <span>
                <b>{formatKc(value)}</b>
                <small>
                  {row.name} · VS {row.vs}
                </small>
              </span>
              <span className="donate-pill">{row.hold}</span>
            </button>
          );
        })}
      </div>
      <button type="button" className="donate-gold donate-gold-wide" onClick={scrollToQr}>
        Poslat {formatKc(kc)} {cadence === "monthly" ? "měsíčně" : "jednorázově"}
      </button>
      <p className="donate-micro">
        {cadence === "monthly" ? "Trvalý příkaz. Zrušíte kdykoliv. " : ""}
        Žádná veřejná sbírka.
      </p>
    </aside>
  );

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="donate-main">
        <section className="donate-hero">
          <img
            className="donate-hero-bg"
            src="/images/o-nas-vlajka.jpg"
            alt=""
            width={1600}
            height={900}
            decoding="async"
          />
          <div className="donate-hero-veil" />
          <div className="donate-hero-inner">
            <div className="donate-hero-copy">
              <p className="donate-kicker">Nezávislá iniciativa · bez reklam · bez grantů</p>
              <h1 className="font-display">
                Pravda nemá sponzora.
                <br />
                Má jen vás.
              </h1>
              <p className="donate-lead">
                Dezinformace se šíří zadarmo. Fakta, analýzy a kontext stojí čas, lidi a provoz.
              </p>
              <p className="donate-lead">Jedním darem držíte hlas, který se nenechá koupit.</p>
              <div className="donate-hero-actions">
                <button type="button" className="donate-gold" onClick={scrollToQr}>
                  Přispět teď
                </button>
                <button type="button" className="donate-ghost" onClick={scrollToQr}>
                  Zobrazit účet a QR
                </button>
              </div>
            </div>
            {widget}
          </div>
        </section>

        <section className="donate-stats" aria-label="Proč dát">
          <div>
            <b className="font-display">1 hlas</b>
            <span>stačí, aby se v diskusi objevilo chybějící fakta</span>
          </div>
          <div>
            <b className="font-display">300 Kč / měs.</b>
            <span>udrží jednu investigaci a její dosah</span>
          </div>
          <div>
            <b className="font-display">0 Kč</b>
            <span>z grantů, státních peněz a inzerce. Jen vy.</span>
          </div>
        </section>

        <section className="donate-why">
          <div className="donate-wrap">
            <p className="donate-sec-k">Kam dar směřuje</p>
            <h2 className="donate-sec-h font-display">Tři věci, které vaše peníze drží</h2>
            <div className="donate-why-grid">
              <article>
                <div className="donate-ico" aria-hidden="true">
                  <PenLine className="size-5" />
                </div>
                <h3 className="font-display">Analýzy, ne slogany</h3>
                <p>Texty, které vyvracejí lži dřív, než se stanou „obecně známou pravdou“.</p>
              </article>
              <article>
                <div className="donate-ico" aria-hidden="true">
                  <Target className="size-5" />
                </div>
                <h3 className="font-display">Dosah faktů</h3>
                <p>Aby pravda nevisela jen na webu — ale dostala se tam, kde se láme názor.</p>
              </article>
              <article>
                <div className="donate-ico" aria-hidden="true">
                  <Flag className="size-5" />
                </div>
                <h3 className="font-display">Nezávislost</h3>
                <p>Žádný sponzor nám nediktuje tón. Proto musí platit komunita.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="dar-qr" className="donate-bank">
          <div className="donate-wrap">
            <p className="donate-sec-k">Jak poslat dar</p>
            <h2 className="donate-sec-h font-display">Naskenujte. Nebo zkopírujte účet.</h2>
            <div className="donate-bank-grid">
              <div className="donate-qr-card">
                <DonateQr payload={payload} />
                <p>
                  QR platba SPD · {formatKc(kc)}
                  {cadence === "monthly" ? " / měs." : ""}
                  <br />
                  VS {amount.vs}
                </p>
                <button type="button" className="donate-gold donate-gold-wide" onClick={scrollToQr}>
                  Otevřít v bance
                </button>
              </div>
              <dl className="donate-details">
                <div className="donate-row">
                  <dt>Příjemce</dt>
                  <dd>JednímHlasem z. s.</dd>
                </div>
                <div className="donate-row">
                  <dt>Účet</dt>
                  <dd>
                    {ACCOUNT}{" "}
                    <button type="button" className="donate-copy" onClick={copyAccount}>
                      {copied ? (
                        <>
                          <Check className="size-3.5" /> Zkopírováno
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" /> Kopírovat
                        </>
                      )}
                    </button>
                  </dd>
                </div>
                <div className="donate-row">
                  <dt>IBAN</dt>
                  <dd>{IBAN}</dd>
                </div>
                <div className="donate-row">
                  <dt>BIC</dt>
                  <dd>FIOBCZPPXXX</dd>
                </div>
                <div className="donate-row">
                  <dt>Zpráva</dt>
                  <dd>{MSG}</dd>
                </div>
                <div className="donate-row">
                  <dt>Variabilní symbol</dt>
                  <dd className="donate-vs">{amount.vs}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="donate-mobile-flag">
          <img
            src="/images/o-nas-vlajka.jpg"
            alt="Žena zahalená izraelskou vlajkou hledí do krajiny"
            className="donate-mobile-flag-img"
          />
        </section>

        <section className="donate-note">
          <div className="donate-wrap">
            <p>
              Nejsme veřejná sbírka. Jde o dar na činnost iniciativy. Údaje jsou ukázkové a před
              spuštěním se nahradí skutečným účtem. Při platbě na transparentní účet může být jméno
              a částka vidět ve výpisu.
            </p>
          </div>
        </section>

        <section className="donate-contact">
          <div className="donate-wrap">
            <p className="donate-sec-k">Kontakt</p>
            <h2 className="donate-sec-h font-display">Potřebujete potvrzení daru?</h2>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-[1.55] text-foreground">
              Napište nám na{" "}
              <a
                href="mailto:info@jednimhlasem.cz"
                className="font-semibold text-primary hover:text-[var(--accent-blue)] hover:underline"
              >
                info@jednimhlasem.cz
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      {copied ? (
        <div className="donate-toast" role="status" aria-live="polite">
          Zkopírováno
        </div>
      ) : null}
      <SiteFooter />
    </div>
  );
}
