import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { MoreButton } from "@/components/more-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import flagsImg from "@/assets/news-flags.jpg";
import politicsImg from "@/assets/news-politics.jpg";

export const Route = createFileRoute("/antisemitismus")({
  head: () => ({
    meta: [
      { title: "Antisemitismus — co to je a jak se proměňuje | JednímHlasem" },
      {
        name: "description",
        content:
          "Co antisemitismus je a co není, jak se v čase proměňoval, odkud pojem pochází, co je nový a islamistický antisemitismus a jak odlišit kritiku od nenávisti.",
      },
      { property: "og:title", content: "Antisemitismus — co to je a jak se proměňuje" },
      {
        property: "og:description",
        content:
          "Dlouhodobý psycho-sociální vzorec, který mění jazyk, ale ne logiku. Fakta, kontext a nástroje k rozlišení kritiky od nenávisti.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Antisemitismus,
});

type Block =
  | { h: string }
  | { p: string }
  | { list: string[] };

const SECTIONS: { id: string; title: string; blocks: Block[] }[] = [
  {
    id: "co-je",
    title: "Co je (a není) antisemitismus",
    blocks: [
      {
        p: "Antisemitismus je specifický a dlouhodobý psycho-sociální a kulturní fenomén, který nelze redukovat na pouhou osobní nenávist, předsudek nebo formu diskriminace. Vyznačuje se mimořádnou historickou kontinuitou, schopností měnit své projevy a přizpůsobovat se různým ideologickým a společenským kontextům, aniž by ztratil své základní rysy.",
      },
      {
        p: "Antisemitismus není ojedinělým excesem dějin ani výlučně produktem moderní doby. Existoval v různých podobách před vznikem moderních národních států, přetrval zásadní politické i kulturní zlomy a objevuje se i ve společnostech, které se samy chápou jako racionální, sekulární nebo emancipační.",
      },
      { h: "Antisemitismus jako projekční mechanismus" },
      {
        p: "Základním rysem antisemitismu je projekce. Židé (nebo lidé za Židy považovaní) jsou v antisemitských narativech vnímáni jako symbolická entita, do níž jsou promítány obavy, frustrace a nevyřešené konflikty jedince nebo dané společnosti. Antisemitismus tak nepracuje s empirickou zkušeností, ale s abstraktním obrazem, který slouží k vysvětlování složitých nebo ohrožujících jevů.",
      },
      {
        p: "Právě proto není antisemitismus reakcí na konkrétní chování Židů, ale autonomním systémem představ, který si zachovává svou účinnost i bez faktického základu. Může přetrvávat i tam, kde reální Židé nejsou přítomni. Jeho funkcí není popis reality, ale její zjednodušení prostřednictvím symbolického viníka.",
      },
      { h: "Vnitřní rozpornost jako strukturální znak" },
      {
        p: "Jedním z nejvýraznějších rysů antisemitismu je jeho vnitřní logická rozpornost. Nejde o omyl ani nedorozumění, ale o základní mechanismus této nenávisti. Židé jsou v antisemitských narativech obviňováni bez ohledu na to, co skutečně dělají nebo čím jsou.",
      },
      {
        p: "Mohou být současně vykreslováni jako kapitalisté i komunisté, kořistníci i paraziti, chudí i extrémně bohatí, kosmopolité i uzavřená sekta, rozkladný prvek společnosti i její skrytí vládci. Stejný dvojí metr platí i pro jejich politické postavení: pokud jsou bezmocní, „zaslouží si svůj osud“; pokud se brání, jsou označováni za nebezpečné agresory. Pokud nemají stát, jsou považováni za nedůvěryhodné a bez kořenů; pokud stát mají, jsou označováni za nelegitimní kolonizátory.",
      },
      {
        p: "Tato rozpornost není slabinou antisemitismu, ale jeho silou. Umožňuje, aby byl Žid vždy viníkem – bez ohledu na okolnosti, fakta či realitu. Výsledek je předem daný, mění se pouze záminka.",
      },
      { h: "Proč je antisemitismus specifický" },
      {
        p: "Antisemitismus nelze chápat pouze jako jednu z mnoha forem předsudečné nenávisti, protože není založen primárně na představě méněcennosti. Zatímco většina forem rasismu a xenofobie pracuje s obrazem slabé, zaostalé či podřadné skupiny, antisemitismus funguje opačně.",
      },
      {
        p: "Židé nejsou v antisemitských představách vnímáni jako oběť, ale jako domněle všemocný nepřítel: jako nositelé skryté moci, jako aktéři zákulisního vlivu, jako ti, kdo údajně manipulují společností, ekonomikou nebo politikou.",
      },
      { h: "Odolnost vůči faktům a racionalitě" },
      {
        p: "Antisemitismus je charakteristický svou odolností vůči empirickým argumentům. Fakta, která narativ zpochybňují, nejsou přijímána jako korekce, ale jsou reinterpretována jako součást domnělého spiknutí nebo důkaz „skryté moci“. V tomto smyslu jde o paranoidní interpretační rámec, v němž každý protiargument potvrzuje původní podezření a absence důkazů je sama považována za důkaz.",
      },
      { h: "Antisemitismus jako indikátor společenského napětí" },
      {
        p: "Ačkoli antisemitismus míří proti jedné konkrétní skupině, jeho význam je širší. Zesilování tolerance k jeho projevům obvykle doprovází:",
      },
      {
        list: [
          "období politické a sociální nejistoty,",
          "krize legitimity institucí,",
          "snahu nalézt jednoduchá vysvětlení komplexních problémů.",
        ],
      },
      {
        p: "Z tohoto důvodu bývá antisemitismus chápán i jako indikátor stavu společnosti – nikoli pouze jako problém menšiny, ale jako signál hlubší poruchy veřejného myšlení a politické kultury.",
      },
      { h: "Co antisemitismus není" },
      {
        p: "Rozhodujícím znakem antisemitismu je kolektivní zobecnění, symbolická démonizace a delegitimizace – nikoli legitimní kritika náboženství či historická nebo politická debata vedená bez znaků kolektivní viny a dehumanizace.",
      },
    ],
  },
  {
    id: "promeny",
    title: "Jak se antisemitismus proměňoval v čase",
    blocks: [
      {
        p: "Antisemitismus se v dějinách neposouvá lineárně od jedné fáze ke druhé, ale opakovaně mění své formy v závislosti na idejích a mocenských strukturách dané doby. Jednotlivé podoby se mohou překrývat, kombinovat a vracet v nových souvislostech. Zatímco se mění jazyk a zdůvodnění, základní logika zůstává stejná.",
      },
      { h: "Náboženský antisemitismus (antijudaismus)" },
      { p: "V předmoderních společnostech byl antisemitismus ukotven především nábožensky. Židé byli chápáni jako:" },
      {
        list: [
          "viníci ukřižování Krista,",
          "odmítači „pravé víry“,",
          "vnitřní cizí prvek v křesťanské společnosti.",
        ],
      },
      {
        p: "Tento typ pracoval s morální a teologickou vinou a legitimizoval sociální vylučování, právní omezení a periodické násilí. Základní schéma však již bylo přítomno: kolektivní vina a démonizace.",
      },
      { h: "Raně moderní a sociální antisemitismus" },
      {
        p: "S rozpadem středověkého řádu a proměnami ekonomických struktur se antisemitismus sekularizuje. Náboženský jazyk ustupuje, ale nepřátelství přetrvává. Židé jsou nově vnímáni jako ekonomičtí paraziti, narušitelé sociální rovnováhy a ztělesnění „nečistého“ obchodu a lichvy.",
      },
      { h: "Rasový antisemitismus (19. a první polovina 20. století)" },
      {
        p: "V 19. století je antisemitismus převeden do pseudovědeckého rasového jazyka. Židé již nejsou kritizováni za víru nebo chování, ale za domnělé biologické vlastnosti, „rasovou odlišnost“ a nezměnitelnost své identity. Tento typ ruší možnost konverze nebo asimilace, legitimizuje vyloučení na „vědeckém“ základě a vytváří podmínky pro genocidní politiku nacismu.",
      },
      { h: "Politický a konspirační antisemitismus" },
      {
        p: "Souběžně se rozvíjí antisemitismus konspirační, v němž jsou Židé vykreslováni jako skrytí hybatelé dějin, strůjci revolucí i ekonomických krizí a nepřátelé národa i státu. Je mimořádně adaptabilní: funguje v pravicových i levicových ideologiích a přežívá i po porážce nacismu.",
      },
      { h: "Antisemitismus po roce 1945 (proměna, nikoli konec)" },
      {
        p: "Po holokaustu se otevřený antisemitismus stává morálně neakceptovatelným. Fenomén však nemizí – mění jazyk a nositele:",
      },
      {
        list: [
          "z biologického do politického a morálního rámce,",
          "z otevřeného nepřátelství do nepřímých forem,",
          "od Židů jako skupiny ke státu Izrael jako symbolickému nositeli.",
        ],
      },
      {
        p: "Tento vývoj otevírá prostor pro antisionismus jako jednu z moderních forem antisemitismu (aniž by každá kritika Izraele byla nutně antisemitská).",
      },
      { h: "Současné podoby („fenomén 2.0“)" },
      { p: "V současnosti se antisemitismus často objevuje:" },
      {
        list: [
          "v jazyce lidských práv,",
          "v akademickém a aktivistickém prostředí,",
          "v konspiračních teoriích a digitálním prostoru,",
          "v ideologických podobách politického islamismu.",
        ],
      },
      {
        p: "Zachovává si přitom své základní rysy: symbolizaci, kolektivní vinu, vnitřní rozpornost a odolnost vůči faktickému vyvrácení.",
      },
    ],
  },
  {
    id: "pojem",
    title: "Jak vznikl pojem antisemitismus",
    blocks: [
      {
        p: "Pojem antisemitismus nevznikl jako popis dávné nenávisti, ale jako vědomý ideologický konstrukt moderní doby. Do veřejné debaty jej v roce 1879 uvedl německý publicista Wilhelm Marr, který chtěl dát protižidovským postojům novou, „moderní“ podobu. Jeho cílem nebylo navázat na starý náboženský antijudaismus, ale vytvořit světonázor odpovídající sekulární, politické a společenské realitě 19. století.",
      },
      {
        p: "Marr byl novinář a politický aktivista pohybující se v liberálních a levicových kruzích. Antisemitismus se tak zrodil uvnitř moderní, sekulární společnosti. Marr jej prezentoval jako racionální analýzu reality, nikoli jako emoci či předsudek. Židy nechápal jako náboženskou skupinu, kterou by bylo možné „napravit“ nebo asimilovat, ale jako neměnný kolektivní prvek, údajně neslučitelný s německou společností. Právě zde se odehrál zásadní posun: od kritiky víry k ideologii vylučování.",
      },
      {
        p: "Samotný termín byl zvolen záměrně: měl znít vědecky, objektivně a hodnotově neutrálně. Nikdy nebyl míněn doslovně jako nenávist vůči Semitům – byl to politický název pro specifickou nenávist vůči Židům. Marr tvrdil, že mezi „Germány“ a „Židy“ probíhá nevyhnutelný konflikt, v němž Židé údajně vítězí – nikoli proto, že by byli slabí, ale právě proto, že jsou příliš úspěšní a příliš vlivní. Tento paradox se stal jedním ze základních rysů moderního antisemitismu.",
      },
      {
        p: "Antisemitismus se tak od počátku profiloval jako vysvětlující ideologie, která nabízela jednoduché odpovědi na složité společenské změny. Nešlo o kritiku konkrétního chování, ale o popření práva Židů být plnohodnotnou součástí společnosti.",
      },
      {
        p: "Paradoxem zůstává, že sám Marr se na sklonku života od masového antisemitského hnutí částečně distancoval, své základní teze však neodvolal. Nevytvořil nenávist vůči Židům, ale jazyk, který jí umožnil přežít modernitu.",
      },
    ],
  },
  {
    id: "novy",
    title: "Nový antisemitismus",
    blocks: [
      {
        p: "Pojem „nový antisemitismus“ neoznačuje vznik zcela nového fenoménu. Označuje novou konfiguraci starých antisemitských vzorců, které se po druhé světové válce přizpůsobily zásadně změněným politickým, morálním a ideologickým podmínkám.",
      },
      { h: "Kontinuita se „starým“ antisemitismem" },
      {
        p: "Základní schéma zůstává zachováno: kolektivní vina, symbolická démonizace, představa skryté moci a vysvětlování složitých problémů pomocí jednoho univerzálního viníka. Mění se jazyk a zdůvodnění, nikoli cíl. Namísto rasových a biologických kategorií nastupují kategorie politické, morální a geopolitické.",
      },
      { h: "Poválečný zlom a studená válka" },
      {
        p: "V sovětském bloku dochází od konce 40. let k transformaci antisemitismu: otevřený rasový jazyk je nahrazen jazykem antisionismu a Židé jsou vykreslováni jako kosmopolitní a neloajální. Tento diskurz umožňoval pokračovat v antisemitismu bez zdiskreditovaných rasových teorií, spojit jej s oficiální ideologií „antifašismu“ a prezentovat jej jako legitimní politickou kritiku.",
      },
      { h: "Izrael jako nový nositel starých projekcí" },
      {
        p: "Vznik Státu Izrael v roce 1948 znamenal zásadní posun. Poprvé v moderních dějinách existoval konkrétní politický subjekt, na který bylo možné přenést staré antisemitské narativy. Izrael se postupně stává symbolem údajné židovské moci, náhradním objektem kolektivní viny a projekční plochou pro globální frustrace.",
      },
      { h: "Arabský svět a internacionalizace antisionismu" },
      {
        p: "V arabském světě se v jeden celek spojily tradiční náboženské motivy, evropské antisemitské stereotypy a sovětský anti-sionistický diskurz. Ten byl následně exportován do mezinárodního prostředí, kde získal podobu zdánlivě univerzálního jazyka lidských práv a antikolonialismu.",
      },
      {
        p: "Symbolickým vyvrcholením byla rezoluce Valného shromáždění OSN č. 3379 z roku 1975, která označila sionismus za formu rasismu. Ačkoli byla v roce 1991 formálně zrušena, její jazyk, logika a důsledky přetrvávají.",
      },
      { h: "Jazyk modernity a sociální spravedlnosti" },
      {
        p: "Jazyk lidských práv a boje proti rasismu poskytuje novému antisemitismu „lidskou“ masku. Antisemitismus se tak může prezentovat nikoli jako nenávist, ale jako morální postoj, politická angažovanost či snaha o globální spravedlnost. To ztěžuje jeho rozpoznání a umožňuje jeho normalizaci v prostředích, která se sama chápou jako liberální a antirasistická.",
      },
    ],
  },
  {
    id: "islamisticky",
    title: "Islámský (islamistický) antisemitismus",
    blocks: [
      { h: "Důležité rozlišení" },
      {
        p: "Je nezbytné rozlišovat mezi islámem jako náboženstvím a islamismem jako moderní politickou ideologií. Antisemitismus, o němž je zde řeč, je produktem politického islamismu, nikoli inherentní součástí islámu.",
      },
      { h: "Co jím rozumíme" },
      {
        p: "Jde o moderní ideologický fenomén, který vznikl spojením evropského antisemitismu 20. století, politického islamismu a konfliktů Blízkého východu. Na rozdíl od tradičních náboženských předsudků je tento antisemitismus politický, konspirační a existenciální: Židé v něm nejsou vnímáni pouze jako nábožensky „jiní“, ale jako globální nepřítel.",
      },
      { h: "Přenos evropského antisemitismu" },
      {
        p: "Začátkem 20. století došlo k přenosu moderního evropského antisemitismu do části muslimského světa. Narativy o světovém židovském spiknutí byly převzaty a dále rozvíjeny v místním politickém a náboženském kontextu – a na rozdíl od Evropy zde neztratily legitimitu, ale institucionalizovaly se.",
      },
      { h: "Izrael jako symbolický cíl" },
      {
        p: "Vznik židovské státní suverenity umožnil přenesení předchozích antisemitských vzorců na konkrétní politický subjekt. Antisionismus zde neslouží jako kritika konkrétní politiky, ale jako rámec, jenž umožňuje otevřený antisemitismus prezentovat jako politický či náboženský odpor.",
      },
      { h: "Charakteristika" },
      {
        list: [
          "absolutizace konfliktu,",
          "víra v globální židovské spiknutí,",
          "popření možnosti kompromisu,",
          "přenesení viny na Židy jako celek, nikoli na konkrétní aktéry.",
        ],
      },
      { h: "Průnik se západní levicí" },
      {
        p: "Islamistický antisemitismus se propojuje se západními anti-sionistickými diskurzy, jejichž moderní politická podoba vznikala už v prostředí Sovětského svazu. Vzniká tak ideologický průnik, v němž islamistické narativy dodávají obsah a západní aktivismus poskytuje jazyk legitimity.",
      },
      { h: "Proč je často přehlížen" },
      {
        p: "Jedním z důvodů je obava z paušalizace a obvinění z islamofobie, které vedou k neochotě rozlišovat mezi náboženstvím a politickou ideologií. Dalším faktorem je způsob výuky: antisemitismus bývá redukován na evropskou historii, nacismus a holokaust, zatímco jeho poválečné a mimoevropské podoby zůstávají na okraji pozornosti.",
      },
    ],
  },
  {
    id: "kritika",
    title: "Jak rozlišit kritiku od nenávisti",
    blocks: [
      {
        p: "Rozlišení mezi legitimní kritikou a antisemitismem patří k nejobtížnějším otázkám současné veřejné debaty. Ne proto, že by hranice neexistovala, ale proto, že jazyk kritiky a jazyk nenávisti dnes často splývají. Antisemitismus začíná tam, kde kritika přestává popisovat konkrétní jednání a přechází k symbolické démonizaci, kolektivní vině nebo delegitimizaci.",
      },
      { h: "Legitimní kritika" },
      {
        list: [
          "směřuje ke konkrétním činům, politikám nebo aktérům,",
          "používá stejná měřítka, jaká by byla použita vůči jiným státům či skupinám,",
          "je otevřená korekci, faktům a protiargumentům.",
        ],
      },
      { h: "Antisemitismus" },
      {
        list: [
          "pracuje s kolektivní odpovědností („Židé“, „sionisté“ jako homogenní celek),",
          "používá symbolický jazyk, který překračuje rámec konkrétní kritiky,",
          "opakuje historické vzorce démonizace a podezírání ze skryté moci,",
          "usiluje o delegitimizaci samotné existence, nikoli o změnu konkrétní politiky.",
        ],
      },
      { p: "Rozhodující není míra emocí, ale struktura argumentu." },
      { h: "Pracovní definice antisemitismu IHRA" },
      {
        p: "Pracovní definici přijaly a používají desítky demokratických států a mezinárodních institucí, včetně České republiky. Slouží jako orientační a vzdělávací rámec pro státní správu, soudy, policii i školy. Není právní normou, ideologickým manifestem ani nástrojem cenzury – je to praktický analytický rámec.",
      },
      { h: "Proč je definice IHRA napadána" },
      {
        p: "Útoky nesměřují primárně proti jejímu obsahu, ale proti důsledkům jejího používání: komplikuje možnost skrývat antisemitismus za politickou kritiku, narušuje narativy prezentující se jako morální nebo emancipační a pojmenovává kontinuitu mezi starými a novými formami nenávisti. Definice přitom výslovně uvádí, že kritika Izraele srovnatelná s kritikou jiných států je zcela legitimní.",
      },
      { h: "Sharanského test tří D" },
      {
        p: "Orientační analytický rámec. Antisemitismus je pravděpodobný tehdy, pokud je vůči Izraeli uplatněno jedno či více z těchto kritérií:",
      },
      {
        list: [
          "Dvojí standard: je Izrael posuzován podle přísnějších nebo zcela odlišných měřítek než jiné státy v obdobných situacích?",
          "Démonizace: je Izrael vykreslován jako absolutní zlo, zdroj veškerého násilí nebo přirovnáván k nacismu?",
          "Delegitimizace: je Izraeli upíráno právo na existenci nebo je jeho vznik označován za inherentně nelegitimní?",
        ],
      },
      { p: "Přítomnost těchto znaků signalizuje překročení hranice mezi kritikou a předsudečnou nenávistí." },
    ],
  },
];

function StarOfDavid({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5 21 18H3L12 2.5Z" />
      <path d="M12 21.5 3 6h18l-9 15.5Z" />
    </svg>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) =>
        "h" in b ? (
          <h3 key={i} className="pt-2 font-display text-base font-bold text-primary">
            {b.h}
          </h3>
        ) : "list" in b ? (
          <ul key={i} className="ml-5 list-disc space-y-1.5 text-[15px] leading-relaxed text-muted-foreground">
            {b.list.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
            {b.p}
          </p>
        ),
      )}
    </div>
  );
}

function Antisemitismus() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-[88rem] px-5 py-12 md:px-6 md:py-16">
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/25 sm:flex">
                <StarOfDavid className="h-6 w-6" />
              </span>
              <div className="min-w-0 max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
                  Klíčové téma
                </p>
                <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                  Antisemitismus
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/85 md:text-[17px]">
                  nelze chápat jako historickou epizodu ani jako uzavřený fenomén dvacátého století.
                  Jde o dlouhodobý a strukturálně specifický jev, který se v průběhu dějin opakovaně
                  proměňuje a přizpůsobuje aktuálním společenským, politickým a ideologickým podmínkám.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[70rem] px-5 py-12 md:px-6 md:py-16">
          <div className="max-w-3xl space-y-5">
            <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Antisemitismus funguje jako dlouhodobý psycho-sociální a kulturní vzorec, který se v čase
              nepřerušuje, ale přepisuje. Neobjevuje se znovu jako nový jev, nýbrž jako aktualizovaná
              verze téhož schématu. Přebírá existující stereotypy a převádí je do jazyka, obrazů a obav,
              které jsou v dané době srozumitelné a společensky přijatelné. Nejde o minulost, která se
              vrací, ale o přítomnost, která si z minulosti vybírá funkční nástroje.
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Ačkoli je antisemitismus namířen proti jedné konkrétní skupině, nevypovídá o této skupině,
              ale o společnosti a jejích institucích, které jej vytvářejí, tolerují nebo mu nejsou schopny
              čelit. Funguje jako indikátor institucionální i kulturní odolnosti společnosti – její
              schopnosti zacházet s nejistotou, konfliktem a složitostí reality bez hledání zástupného
              viníka. Proměnlivá není nenávist sama, ale schopnost ji rozpoznat a míra tolerance k jejím
              projevům.
            </p>
          </div>

          <div className="mt-10 border-t-2 border-primary pt-4">
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-primary md:text-3xl">
              Rozcestník tématu
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Rozklikněte jednotlivé okruhy.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-6 w-full">
            {SECTIONS.map((s) => (
              <AccordionItem key={s.id} value={s.id}>
                <AccordionTrigger className="text-left font-display text-lg font-bold text-primary">
                  {s.title}
                </AccordionTrigger>
                <AccordionContent>
                  <Blocks blocks={s.blocks} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
