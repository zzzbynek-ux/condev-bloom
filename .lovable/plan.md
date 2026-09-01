# Předělání stránky `/o-nas`

## Cíl
Vytvořit novou, přehlednou stránku „O nás“, která představí komunitu, její hodnoty a osy (témata), aniž by vypadala jako druhá homepage nebo seznam článků. Header a footer zůstávají se stejnou strukturou, ale tlačítko „Podpořte nás“ se vrátí na bílý outline a zmizí odkazy na Facebook/Instagram.

## Design
- Pozadí bílé, primární barva izraelská modř `#0038B8`, hlavní text `#0B1B33`, perex `#5B6472`.
- Max šířka obsahu `1120 px`, dlouhé texty zarovnané doleva, hlavní nadpis může být centrovaný.
- Karty bílé, `border-radius: 16px`, jemný stín, stejný styl jako karty na homepage.
- Červená se na této stránce nepoužije (žádný Nahlásit incident).

## Struktura stránky (přesně v tomto pořadí)

### 1. Intro
- Eyebrow: `O NÁS`.
- H1: `Jedním hlasem neznamená všichni stejně, ale společně za to, co nás spojuje.` (může být centrovaný).
- Perex (přesný text): `JednímHlasem je nezávislá občanská iniciativa a otevřená platforma, která vznikla jako reakce na rostoucí dezinformace, selektivní empatii a zkreslený obraz Izraele ve veřejném prostoru. Naším cílem je vracet fakta, kontext a důstojnost do debaty – v době, kdy se realita ohýbá podle ideologie a pravda přizpůsobuje algoritmům.`
- Pod perexem 3 textové odkazy vedle sebe:
  - `Naše hodnoty` → `#hodnoty`
  - `Naše osy` → `#osy`
  - `Zapojte se` → `#zapojte-se`

### 2. Co nás drží
- Nadpis: `Co nás drží`.
- 3 sloupce bez ikon (nebo s jemnou tečkou):
  1. **Izrael** — Podporujeme Izrael a jeho právo na existenci a sebeobranu.
  2. **Antisemitismus** — Bojujeme proti antisemitismu ve všech jeho formách.
  3. **Pravda** — Vyvracíme dezinformace, posilujeme odvážné hlasy a chráníme hodnoty svobodné společnosti.

### 3. Naše hodnoty `#hodnoty`
- Nadpis: `Naše hodnoty`.
- Seznam 3 bodů:
  1. Podporujeme Izrael jako demokratický stát s právem na existenci a sebeobranu.
  2. Odmítáme antisemitismus ve všech jeho podobách – ať už se skrývá za tzv. kritiku politiky, levicový aktivismus nebo konspirační teorie krajní pravice.
  3. Věříme, že obhajoba Izraele je zároveň obranou principů svobodného světa.

### 4. Naše osy `#osy`
- Nadpis: `O čem mluvíme`.
- Podnadpis: `Osy, které nás vedou. Každá vede dál — na téma, článek nebo encyklopedii.`
- Mřížka 2 sloupce na desktopu, 1 na mobilu.
- Každá osa = karta: štítek/kicker, titulek, perex, jeden odkaz.
- **Hlavní karta** (plná šířka, `col-span-2`):
  - Štítek: `KLÍČOVÉ TÉMA`
  - Titulek: `Antisemitismus`
  - Text: `Nový antisemitismus se tváří jako morální apel — mluví jazykem solidarity a historické křivdy. Ale pod pláštíkem vznešených slov jde o démonizaci a delegitimizaci židovského státu. Nacistickou pásku nahradila kefíja — ale posedlost Židy zůstala.`
  - CTA: `Otevřít téma →`
  - Odkaz povinně externí: `https://community.condevweb.com/antisemitismus/`
- **Ostatní karty** (2 sloupce):
  - **Identita** → `/clanky/maly-stat-globalni-prinos` nebo `/clanky`
  - **Jeden klik mění svět** → `/clanky` nebo `/manifest`
  - **Rudo-zelená aliance** → `/clanky/rudo-zelena-aliance`
  - **Média ve službách teroru** → `/clanky/media-ve-sluzbach-teroru`
  - **Zaměřeno na Katar** → `/clanky/zamereno-na-katar`
  - **Mír začíná s pravdou** → `/clanky/mir-zacina-s-pravdou`
  - **Wiki jako nástroj vlivu** → `/clanky/wiki-jako-nastroj-vlivu`
  - **Odlišní vírou, spojeni svědomím** → `/clanky/odlisni-virou`
- Nepřidávat kartu Ptejte se AI.

### 5. Co děláme
- Nadpis: `Co děláme`.
- Jeden odstavec: `Publikujeme analýzy, komentáře a investigativní články, které vyvracejí dezinformace a doplňují kontext. Vytváříme kampaně a obsah, který přináší věcný, srozumitelný a důstojný pohled na dění v Izraeli, České republice i v dalších západních zemích. Sledujeme a komentujeme mediální zkreslení i roli NGO, akademie a dalších institucí ve formování veřejného obrazu Izraele. Budujeme komunitu lidí, kterým není lhostejné, když se realita mění v propagandu.`

### 6. Naše mise
- Nadpis: `Naše mise`.
- Text přesně: `Věříme, že pravda potřebuje obhájce. V čase, kdy jsou fakta zpochybňována a nenávist se maskuje jako humanismus, je potřeba mluvit jasně a přesvědčivě. JednímHlasem propojuje odborníky, novináře, akademiky i aktivní občany, kteří sdílejí závazek k odpovědné debatě o Izraeli, antisemitismu a hodnotách svobodného světa.`

### 7. Zapojte se `#zapojte-se`
- Nadpis: `Zapojte se`.
- Text: `JednímHlasem je otevřená platforma. Nabízíme prostor autorům, kteří chtějí publikovat vlastní články, analýzy nebo komentáře.`
- Dvě tlačítka:
  - Primární modré: `Napsat na info@jednimhlasem.cz` → `mailto:info@jednimhlasem.cz`
  - Sekundární obrys: `Jak se zapojit` → `/zapojte-se`

## Technické úkoly
1. **Data**: vytvořit `src/lib/about-content.ts` s konstantami pro všechny sekce (intro, co-nas-drzi, hodnoty, osy, co-delame, mise, zapojte-se).
2. **Komponenty**:
   - `SectionHeader` (pokud neexistuje, vytvořit) s kickerem a nadpisem.
   - `TopicCard` — bílá karta s kickerem, titulkem, perexem a odkazem, shodný styl s homepage kartami.
3. **Route**: přepsat `src/routes/o-nas.tsx` podle výše uvedené struktury. Použít `max-w-[1120px]` kontejner, anchor odkazy pro `#hodnoty`, `#osy`, `#zapojte-se`.
4. **Header**: v `src/components/site-header.tsx` změnit tlačítko „Podpořte nás“ na bílý outline (`variant="outline"` nebo vlastní bílá třída), odstranit ikony Facebooku a Instagramu (ponechat jen X).
5. **Footer**: ponechat beze změny.
6. **Styly**: ověřit a případně upravit `src/styles.css`, aby `--foreground` = `#0B1B33`, `--muted-foreground` = `#5B6472`, `--primary` = `#0038B8` a pozadí bylo bílé. Žádná červená na této stránce.
7. **SEO**: aktualizovat meta tagy v `head` pro `/o-nas` podle nového obsahu.

## Co se nedělá
- Nepřidávat osy do globálního headeru.
- Nedělat z O nás druhou homepage (žádný hero slider).
- Neduplikovat sliderové texty „Celý obraz“ ani „Antisemitismus“ mimo kartu os.
- Nepoužívat červenou, pokud není zmíněn Nahlásit incident.
