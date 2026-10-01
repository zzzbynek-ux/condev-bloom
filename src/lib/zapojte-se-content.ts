export const MAIL = "info@jednimhlasem.cz";

export const ZAPOJTE = {
  title: "Máte co říct? Napište to.",
  lead: "Debatu o Izraeli a antisemitismu dnes často vedou ti nejhlasitější, ne ti nejlépe informovaní. Fakta mizí pod slogany, souvislosti pod emocemi. A kdo mlčí, přenechává prostor jiným. Nestačí to sledovat. Je potřeba o tom psát.",
  platform:
    "Jedním hlasem je otevřená platforma. Dáváme prostor autorům, kteří chtějí publikovat vlastní články, analýzy a komentáře. Nepotřebujete novinářský průkaz ani akademický titul. Stačí znalost věci, poctivost ke zdrojům a odvaha podepsat se pod vlastní názor.",
  image: {
    src: "/images/zapojte-se.jpg",
    alt: "Otevřený zápisník s propiskou, v pozadí notebook",
  },
  pills: [
    { label: "Koho hledáme", href: "#koho" },
    { label: "Co můžete psát", href: "#psat" },
    { label: "Jak začít", href: "#zacit" },
  ],
  blocks: [
    {
      id: "koho",
      title: "Koho hledáme",
      split: false,
      items: [
        "Odborníky, kteří rozumějí Blízkému východu, historii, mezinárodnímu právu, bezpečnosti nebo médiím.",
        "Novináře a publicisty, jejichž texty se jinam „nehodí“.",
        "Akademiky a studenty, kteří na vlastní oči vidí, co se děje na univerzitách.",
        "Lidi s vlastní zkušeností z Izraele, z židovské komunity a z míst, kde antisemitismus není teorie.",
        "Aktivní občany, kterým už nestačí psát komentáře pod cizí články.",
      ],
    },
    {
      id: "psat",
      title: "Co můžete psát",
      split: true,
      items: [
        "Analýzy a studie: do hloubky, s daty a zdroji.",
        "Komentáře: věcně a ostře k tomu, co se právě děje.",
        "Investigativní texty: kdo platí, kdo tlačí, kdo mlčí.",
        "České příběhy o Češích a Izraeli, dnes i v historii.",
        "Osobní svědectví, která je potřeba slyšet.",
      ],
    },
    {
      id: "zisk",
      title: "Co získáte",
      split: false,
      items: [
        "Prostor pro témata, na která jinde nezbývá místo.",
        "Redakční podporu. Pomůžeme s editací, titulkem i ověřením faktů.",
        "Dosah. Vaše texty sdílíme na našich sítích a v komunitě.",
        "Zázemí lidí, kteří stojí na stejné straně.",
      ],
    },
    {
      id: "cekat",
      title: "Co čekáme",
      split: false,
      items: [
        "Fakta, ne fámy. Každé tvrzení musí jít doložit.",
        "Původní text, napsaný pro nás, ne převzatý.",
        "Jasný názor a slušný tón. Kritika ano, nenávist ne, a to vůči komukoli.",
      ],
    },
  ],
  startTitle: "Jak začít",
  start: [
    "Pošlete nám námět nebo rovnou hotový text na info@jednimhlasem.cz.",
    "Připojte pár vět o sobě.",
    "Ozveme se vám do 7 dnů.",
  ],
  pseudo: "Obáváte se reakcí? Domluvíme se na zveřejnění pod pseudonymem.",
  close: [
    "Jedním hlasem neznamená všichni stejně. Znamená to společně.",
    "Každý nový autor je další hlas, který nejde přehlédnout. Přidejte ten svůj.",
  ],
} as const;
