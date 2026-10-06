/**
 * Duitse gelegenheidspagina's. Pakketten, voorbeelddag, foto's en kleur komen uit
 * landings.ts (LANDINGS); hier staan alleen de woorden. Bedragen via pakketPrijs()
 * en vanafPrijs(), zodat ze altijd gelijk zijn aan het Nederlands.
 *
 * Doelgroep: Duitse groepen en bedrijven op stedentrip naar Utrecht, altijd met 'Sie'.
 * Wat een Nederlander niet hoeft te weten (Borrel, MwSt., bereikbaarheid) wordt kort uitgelegd.
 */
import { REGELS } from '../aanbod';
import { LANDINGS } from '../landings';
import { pakketPrijs, vanafPrijs } from './opmaak';
import type { LandingTekst, Vraag } from './types';
import type { VertaaldeLanding } from './landings-en';

const prijs = (slug: string) => pakketPrijs('de', slug);
const vanaf = (sleutel: VertaaldeLanding) => vanafPrijs('de', LANDINGS[sleutel].pakketten);

const GROEP = `Ab ${REGELS.minPers} Personen.`;

const GROTER: Vraag = {
  q: `Was ist, wenn wir mehr als ${REGELS.maxPers} Personen sind?`,
  a: `Online buchen können Sie für ${REGELS.minPers} bis ${REGELS.maxPers} Personen. Ist Ihre Gruppe größer, melden Sie sich bitte bei uns unter info@dagjeutrecht.nl oder +31 30 227 14 39.`,
};

const WEER: Vraag = {
  q: 'Was ist, wenn es regnet?',
  a: 'Boule, Shuffleboard und der Umtrunk finden drinnen statt, die gehen also immer. Kanufahren findet auch bei Regen statt; nur bei Gewitter oder starkem Wind weichen wir auf einen Programmpunkt drinnen aus.',
};

const ALGEMENE_FAQ: Vraag[] = [
  {
    q: 'An welchen Tagen ist es möglich?',
    a: `Donnerstag, Freitag und Samstag. Bitte buchen Sie mindestens ${REGELS.minDagenVooruit} Tage im Voraus.`,
  },
  {
    q: 'Kann sich die Teilnehmerzahl noch ändern?',
    a: `Ja, bis ${REGELS.aantalDefinitiefDagenVooraf} Tage vor dem Termin. Danach ist die Zahl verbindlich.`,
  },
  {
    q: 'Können Sie Ernährungswünsche berücksichtigen?',
    a: 'Ja, Ernährungswünsche können Sie bei der Buchung angeben. Beim Mittagessen ist außerdem eine vegetarische Variante möglich. Individuelle Programme können wir nicht anbieten.',
  },
];

const BEVESTIGING: Vraag = {
  q: 'Wie schnell wissen wir, ob es klappt?',
  a: 'Innerhalb von 3 Werktagen bestätigen unsere Partner alles, und Sie erhalten einen Zahlungslink. Am Tag vorher bekommen Sie alle Zeiten und Adressen.',
};

const FACTUUR: Vraag = {
  q: 'Bekommen wir eine Rechnung auf den Firmennamen?',
  a: 'Ja. Geben Sie bei der Buchung den Firmennamen an, dann wird die Rechnung auf das Unternehmen ausgestellt, mit ausgewiesener niederländischer MwSt. Sie bezahlen den vollen Betrag vorab über einen Zahlungslink.',
};

export const LANDINGS_DE: Record<VertaaldeLanding, LandingTekst> = {
  bedrijfsuitje: {
    link: 'Firmenausflug',
    band: [
      'Boule',
      'Shuffleboard',
      'Kanufahren',
      'Mittagessen',
      'Umtrunk',
      'Rechnung auf die Firma',
    ],
    zuster: {
      href: 'https://stepverhuurutrecht.nl/bedrijfsuitje-utrecht',
      label: 'Firmenausflug mit Kickbikes',
      tekst: 'Nur Kickbikes für das Team mieten, ohne Mittagessen und Umtrunk?',
    },
    metaTitel: `Firmenausflug Utrecht ab ${vanaf('bedrijfsuitje')} pro Person`,
    metaOmschrijving: `Firmenausflug nach Utrecht zum Festpreis pro Person: ab ${vanaf('bedrijfsuitje')} für einen Vormittag, ${prijs('spel-en-borrel')} für einen ganzen Tag. Ab ${REGELS.minPers} Personen, inkl. MwSt.`,
    boven: 'Für HR, Teamleitungen und Betriebsräte',
    titel: 'Firmenausflug nach Utrecht, ganz ohne Aufwand',
    intro:
      'Wählen Sie ein Paket oder stellen Sie Ihren Tag selbst aus festen Programmpunkten zusammen. Sie sehen sofort den Preis, wir kümmern uns um die Reservierungen bei unseren Partnern. Alles liegt zu Fuß vom Bahnhof Utrecht Centraal oder eine kurze Fahrt entfernt am grünen Stadtrand.',
    alineas: [
      {
        kop: 'Drinnen oder draußen',
        tekst:
          'In der Innenstadt spielen Sie Boule in der JEU und Shuffleboard in The Grand Shuffle, zu Fuß vom Bahnhof Utrecht Centraal erreichbar. Das geht das ganze Jahr und bei jedem Wetter. Lieber an die frische Luft? Im Landgut Amelisweerd am Stadtrand fahren Sie Kanu oder machen Stand-up-Paddling auf der Kromme Rijn und schließen mit Grillen ab.',
      },
      {
        kop: 'Was es kostet',
        tekst: `Ein ganzer Tag beginnt bei ${prijs('spel-en-borrel')} pro Person für Utrecht Spiel & Umtrunk, mit Kaffee, Mittagessen und Umtrunk. Amelisweerd Aktiv kostet ${prijs('amelisweerd-actief')} pro Person, einschließlich Picknick und Grillen mit Getränken. Hat das Team nur einen halben Tag? Boule & Umtrunk kostet ${prijs('boules-en-borrel')} pro Person für einen Nachmittag, Kaffee & City Challenge ${prijs('koffie-en-city-challenge')} für einen Vormittag. Alle Preise gelten pro Person inklusive niederländischer MwSt., ab ${REGELS.minPers} Personen.`,
      },
      {
        kop: 'Gut erreichbar',
        tekst:
          'Die Tage in der Innenstadt beginnen in der JEU de boules bar am Paardenveld, fünf Gehminuten vom Bahnhof Utrecht Centraal. Dort halten direkte Züge aus Amsterdam, vom Flughafen Schiphol und aus den meisten niederländischen Städten, und auch der ICE zwischen Frankfurt und Amsterdam hält in Utrecht Centraal. Wer mit dem Zug kommt, ist also schnell da, und wer früher gehen muss, steigt genauso leicht wieder ein. Amelisweerd liegt am Stadtrand, bei Botenverhuur De Rijnstroom an der Kromme Rijn.',
      },
      {
        kop: 'Ein Ansprechpartner, eine Rechnung',
        tekst:
          'Sie müssen nicht selbst mit der Boulebar, dem Bootsverleih und dem Restaurant korrespondieren. Wir reservieren alles bei unseren festen Partnern, und Sie erhalten eine Rechnung auf den Namen Ihres Unternehmens. Bezahlt wird vorab über einen Zahlungslink. Am Tag selbst ist Ger Ihr Ansprechpartner.',
      },
      {
        kop: 'Auch für ein Firmenevent',
        tekst:
          'Ein Jubiläum, ein Abschied oder ein abgeschlossenes Projekt? Beginnen Sie mit einem Spiel und schließen Sie mit einem Umtrunk ab: Dann haben alle etwas gemeinsam erlebt, und danach bleibt Zeit für Gespräche. Schauen Sie auch beim Betriebsausflug nach passenden Paketen.',
      },
    ],
    faq: [
      FACTUUR,
      { q: 'Mit wie vielen Personen ist es möglich?', a: GROEP },
      GROTER,
      {
        q: 'Können wir auch nur einen Nachmittag buchen?',
        a: `Ja. Boule & Umtrunk ist ein Nachmittag von 14 bis 18 Uhr und kostet ${prijs('boules-en-borrel')} pro Person. Kaffee & City Challenge ist ein Vormittag und kostet ${prijs('koffie-en-city-challenge')} pro Person.`,
      },
      WEER,
      BEVESTIGING,
      ...ALGEMENE_FAQ,
    ],
  },

  personeelsuitje: {
    link: 'Betriebsausflug',
    band: ['Betriebsrat', 'Boule', 'City Challenge', 'Mittagessen', 'Umtrunk', 'Eine Rechnung'],
    metaTitel: `Betriebsausflug Utrecht ab ${vanaf('personeelsuitje')} pro Person`,
    metaOmschrijving: `Betriebsausflug nach Utrecht für Jung und Alt: Boule, City Challenge oder Kanufahren, mit Mittagessen und Umtrunk. Ab ${vanaf('personeelsuitje')} pro Person, Festpreis inkl. MwSt.`,
    boven: 'Für Betriebsräte, Festausschüsse und HR',
    titel: 'Betriebsausflug nach Utrecht',
    intro:
      'Ein Ausflug, bei dem alle mitmachen können, vom Praktikanten bis zur Kollegin kurz vor der Rente. Wählen Sie ein Paket mit festem Preis pro Person, um den Rest kümmern wir uns.',
    alineas: [
      {
        kop: 'Für alle machbar',
        tekst:
          'Bei einem Betriebsausflug kommt es darauf an, dass niemand außen vor bleibt. Boule und Shuffleboard sind in zwei Würfen erklärt und brauchen keine Kondition. Die City Challenge machen Sie zu Fuß und im eigenen Tempo. Wer gern draußen aktiv ist, wählt im Sommer Kanufahren in Amelisweerd.',
      },
      {
        kop: 'Ein Nachmittag nach der Arbeit',
        tekst: `Boule & Umtrunk beginnt um 14 Uhr mit Boule und Snacks und endet mit einem Umtrunk bis 18 Uhr. Das kostet ${prijs('boules-en-borrel')} pro Person, inklusive MwSt. Von November bis März gibt es den Winter-Umtrunk mit Glühwein vorab, für ${prijs('winterborrel')} pro Person.`,
      },
      {
        kop: 'Oder ein ganzer Tag',
        tekst: `Utrecht Spiel & Umtrunk dauert von 9:30 bis 18 Uhr: Kaffee und Kuchen, Boule, ein Gruppen-Mittagessen, Shuffleboard und ein Umtrunk, alles drinnen in der Innenstadt. Das kostet ${prijs('spel-en-borrel')} pro Person. Im Winter ist der Warme Wintertag mit Domturm und niederländischem Wintermittagessen eine gute Alternative, für ${prijs('warme-winterdag')} pro Person.`,
      },
      {
        kop: 'Praktisch für den Betriebsrat',
        tekst:
          'Sie sehen den Preis pro Person vorab und wissen also genau, was vom Budget abgeht. Bis eine Woche vor dem Termin kann sich die Teilnehmerzahl noch ändern. Die Rechnung wird auf den Betriebsrat, den Verein oder das Unternehmen ausgestellt.',
      },
    ],
    faq: [
      {
        q: 'Mit wie vielen Kolleginnen und Kollegen ist es möglich?',
        a: `${GROEP} Online buchen können Sie bis ${REGELS.maxPers} Personen.`,
      },
      GROTER,
      {
        q: 'Ist es auch für ältere Kolleginnen und Kollegen geeignet?',
        a: 'Ja. Boule, Shuffleboard und die City Challenge brauchen keine Kondition. Nur der Domturm (465 Stufen) ist nicht geeignet für Menschen mit Höhenangst oder eingeschränkter Mobilität.',
      },
      {
        q: 'Kann die Rechnung auf den Betriebsrat ausgestellt werden?',
        a: 'Ja. Geben Sie bei der Buchung den Namen des Betriebsrats, des Vereins oder des Unternehmens an, dann wird die Rechnung auf diesen Namen ausgestellt, mit ausgewiesener MwSt.',
      },
      WEER,
      BEVESTIGING,
      ...ALGEMENE_FAQ,
    ],
  },

  familiedag: {
    link: 'Familientag',
    band: [
      'Kollegen',
      'Partner',
      'Kinder willkommen',
      'Grachtenfahrt',
      'City Challenge',
      'Eine Rechnung',
    ],
    metaTitel: `Firmen-Familientag in Utrecht ab ${vanaf('familiedag')} p. P.`,
    metaOmschrijving: `Familientag für Ihr Unternehmen in Utrecht mit Kollegen, Partnern und Kindern: Grachtenfahrt, City Challenge oder Kanufahren. Ab ${vanaf('familiedag')} pro Person, inkl. MwSt.`,
    boven: 'Für Unternehmen, mit Partnern und Kindern',
    titel: 'Familientag für Ihr Unternehmen in Utrecht',
    intro:
      'Ein Tag, an dem die Belegschaft ihre Familien mitbringt. Wählen Sie ein Paket mit festem Preis pro Person, oder fragen Sie nach einem Extra wie Bowling. Wir übernehmen die Reservierungen, Sie erhalten eine Rechnung.',
    alineas: [
      {
        kop: 'Für Jung und Alt',
        tekst:
          'Bei einem Familientag kommen Partner und Kinder mit, das Programm muss also für alle passen. Wählen Sie Programmpunkte ohne Hürden: eine Grachtenfahrt, die City Challenge zu Fuß durch die Altstadt oder Boule auf überdachten Bahnen. Im Sommer kann die Gruppe auch auf der Kromme Rijn in Amelisweerd Kanu fahren.',
      },
      {
        kop: 'Was es kostet',
        tekst: `Domturm & Grachten kostet ${prijs('dom-en-grachten')} pro Person für einen halben Tag, Kaffee & City Challenge ${prijs('koffie-en-city-challenge')} für einen Vormittag. Ein ganzer Tag drinnen in der Innenstadt, Utrecht Spiel & Umtrunk, kostet ${prijs('spel-en-borrel')} pro Person. Von April bis Oktober gibt es Amelisweerd Aktiv für ${prijs('amelisweerd-actief')} pro Person. Alle Preise inklusive MwSt. Der Preis gilt pro Person: Alle, die mitmachen, zählen mit, auch Kinder.`,
      },
      {
        kop: 'Mit kleinen Kindern',
        tekst:
          'Der Domturm hat 465 Stufen und ist nicht geeignet für Menschen mit Höhenangst oder eingeschränkter Mobilität. Mit kleinen Kindern wählen Sie besser die Grachtenfahrt, die ohne Treppen auskommt. Stand-up-Paddling ist nur möglich, wenn alle schwimmen können. Geben Sie bei der Buchung das Alter der Kinder an, dann denken wir mit.',
      },
      {
        kop: 'Extras auf Anfrage',
        tekst:
          'Bowling, Tischtennis oder Virtual Reality sind bei Familien beliebt. Diese gehören nicht zu den festen Programmpunkten und haben keinen Festpreis: Schreiben Sie uns an info@dagjeutrecht.nl, dann erhalten Sie innerhalb eines Werktags einen Vorschlag mit Preis pro Person.',
      },
      {
        kop: 'Ein Ansprechpartner, eine Rechnung',
        tekst:
          'Sie müssen nicht selbst mit der Reederei, der Boulebar und dem Restaurant korrespondieren. Wir reservieren alles bei unseren festen Partnern, und Sie erhalten eine Rechnung auf den Namen Ihres Unternehmens.',
      },
    ],
    faq: [
      {
        q: 'Können Kinder mitkommen?',
        a: 'Ja. Die Pakete auf dieser Seite sind so gewählt, dass sie auch mit Kindern gut machbar sind. Geben Sie das Alter bei der Buchung an, dann berücksichtigen wir es.',
      },
      {
        q: 'Zählen Kinder bei der Teilnehmerzahl mit?',
        a: `Ja. Der Preis gilt pro Person, und alle, die mitmachen, zählen mit, auch Kinder. ${GROEP}`,
      },
      GROTER,
      FACTUUR,
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },

  teambuilding: {
    link: 'Teambuilding',
    band: ['Zusammenarbeiten', 'Wetteifern', 'Paddeln', 'Kickbike', 'Umtrunk'],
    metaTitel: `Teambuilding in Utrecht ab ${vanaf('teambuilding')} pro Person`,
    metaOmschrijving: `Teambuilding in Utrecht: City Challenge, Boule, Shuffleboard oder Kanufahren. Ab ${vanaf('teambuilding')} pro Person für einen halben Tag, ${prijs('spel-en-borrel')} für einen ganzen Tag.`,
    boven: 'Gemeinsam spielen, gemeinsam paddeln',
    titel: 'Teambuilding in Utrecht',
    intro:
      'Nichts schweißt ein Team so zusammen wie ein gemeinsames Erlebnis. Spielen Sie in Teams gegeneinander auf der Boulebahn, oder arbeiten Sie im Kanu auf der Kromme Rijn zusammen.',
    alineas: [
      {
        kop: 'Wettkampf in der Innenstadt',
        tekst:
          'Boule und Shuffleboard sind schnell gelernt, so kann jeder mitmachen, unabhängig von Alter oder Kondition. Die Teams spielen gegeneinander, und der Tag endet mit einem Umtrunk.',
      },
      {
        kop: 'Zusammenarbeit auf dem Wasser',
        tekst:
          'In Amelisweerd sitzen Sie zu zweit im Kanu. Abstimmen und gemeinsam steuern, das merken Sie sofort. Danach mit dem Kickbike durchs Grüne und zum Abschluss wird gegrillt.',
      },
      {
        kop: 'Die City Challenge',
        tekst: `Bei der City Challenge zieht das Team in kleinen Gruppen durch die Altstadt, mit Aufgaben und Fragen zum Dom, zu den Werftkellern und zur Oudegracht. Gemeinsam rätseln, Aufgaben verteilen und am Ende die Auswertung. Mit Kaffee und Kuchen vorab ist das Kaffee & City Challenge, für ${prijs('koffie-en-city-challenge')} pro Person.`,
      },
      {
        kop: 'Teamausflug oder Teambuilding?',
        tekst:
          'Möchten Sie vor allem einen schönen Tag zusammen verbringen, reicht ein Teamausflug mit einem Spiel und einem Umtrunk. Sollen Menschen, die sich selten sehen, wirklich zusammenarbeiten, wählen Sie Programmpunkte, bei denen man sich aufeinander verlassen muss: zu zweit im Kanu oder ein Team, das gemeinsam die City Challenge löst.',
      },
    ],
    faq: [
      { q: 'Mit wie vielen Personen ist es möglich?', a: GROEP },
      GROTER,
      {
        q: 'Gibt es eine Betreuung?',
        a: 'Bei der City Challenge sind wir bei Start und Ziel vor Ort. Beim Boule bekommen Sie vor Ort eine Einführung, beim Kanufahren eine Einführung vor der Abfahrt.',
      },
      {
        q: 'Ist Teambuilding auch im Winter möglich?',
        a: `Ja. Boule, Shuffleboard und die City Challenge gehen das ganze Jahr. Von November bis März gibt es außerdem den Warmen Wintertag für ${prijs('warme-winterdag')} pro Person.`,
      },
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },

  vrijgezellenfeest: {
    link: 'Junggesellenabschied',
    band: ['Stand-up-Paddling', 'Picknick', 'Kickbike', 'Umtrunk', 'JGA'],
    zuster: {
      href: 'https://stepverhuurutrecht.nl/vrijgezellenfeest-utrecht',
      label: 'Junggesellenabschied mit Kickbikes',
      tekst: 'Nur Kickbikes mieten und den Rest des Tages selbst gestalten?',
    },
    metaTitel: `Junggesellenabschied Utrecht ab ${vanaf('vrijgezellenfeest')} pro Person`,
    metaOmschrijving: `Junggesellenabschied (JGA) in Utrecht zum Festpreis pro Person: ab ${vanaf('vrijgezellenfeest')} für einen Nachmittag und ${prijs('water-naar-borrel')} für einen ganzen Tag, im Sommer und im Winter.`,
    boven: 'Für Trauzeugen und Freundesgruppen',
    titel: 'Junggesellenabschied in Utrecht, den ganzen Tag',
    intro:
      'Ein aktiver Tag, den Sie gemeinsam nicht vergessen. Paket wählen, Termin festlegen und in wenigen Minuten alles erledigt.',
    alineas: [
      {
        kop: 'Vom Wasser zum Umtrunk',
        tekst: `Am Vormittag Stand-up-Paddling auf der Kromme Rijn, ein Picknick am Wasser und danach mit dem Kickbike in die Innenstadt zum Umtrunk in der JEU. Das Paket kostet ${prijs('water-naar-borrel')} pro Person.`,
      },
      {
        kop: 'Schlechtes Wetter angesagt?',
        tekst:
          'Dann wählen Sie Utrecht Spiel & Umtrunk: Boule, Mittagessen, Shuffleboard und Umtrunk, komplett drinnen in der Innenstadt.',
      },
      {
        kop: 'Im Winter',
        tekst: `Stand-up-Paddling und Kanufahren sind von April bis Oktober möglich. Außerhalb dieser Zeit gibt es den JGA-Wintertag: Glühwein, Shuffleboard, ein warmes Mittagessen und ein Umtrunk, komplett drinnen. Er kostet ${prijs('vrijgezellen-winterdag')} pro Person, genau so viel wie das Sommerpaket.`,
      },
      {
        kop: 'Nur ein Nachmittag',
        tekst: `Möchten Sie vormittags selbst etwas planen oder abends weiterfeiern? Boule & Umtrunk ist ein Nachmittag Boule mit Snacks und einem Umtrunk, für ${prijs('boules-en-borrel')} pro Person. Bis zum Bahnhof Utrecht Centraal sind es fünf Gehminuten, praktisch, wenn die Gruppe mit dem Zug anreist.`,
      },
      {
        kop: 'Für die Trauzeugen',
        tekst:
          'Sie organisieren alles, möchten aber auch selbst mitfeiern. Deshalb steht der Preis pro Person vorab fest, und wir reservieren alles bei unseren Partnern. Bis eine Woche vor dem Termin kann sich die Zahl noch ändern, praktisch, wenn jemand noch unentschlossen ist.',
      },
      {
        kop: 'Einen JGA in drei Schritten organisieren',
        tekst:
          'Wählen Sie ein Paket oder stellen Sie Ihren Tag selbst zusammen, legen Sie einen Donnerstag, Freitag oder Samstag fest und geben Sie die Teilnehmerzahl ein. Danach reservieren wir alles bei unseren Partnern, und innerhalb von drei Werktagen erhalten Sie die Bestätigung mit Zahlungslink. Am Tag vorher bekommen Sie alle Zeiten und Adressen, damit Sie sich nur noch um die Braut oder den Bräutigam kümmern müssen.',
      },
      {
        kop: 'Ein Arrangement zum Festpreis',
        tekst: `Jedes Paket ist ein komplettes Arrangement mit festem Preis pro Person, inklusive MwSt.: von einem Nachmittag Boule & Umtrunk für ${prijs('boules-en-borrel')} bis zu einem ganzen Tag Vom Wasser zum Umtrunk für ${prijs('water-naar-borrel')}. Sie wissen vorab, was jeder zahlt, also kein Rechnen und Aufteilen hinterher.`,
      },
      {
        kop: 'Die Orte',
        tekst:
          'In der Innenstadt spielen Sie Boule in der JEU am Paardenveld und Shuffleboard in The Grand Shuffle, zu Fuß vom Bahnhof Utrecht Centraal und von den Terrassen an der Oudegracht. Außerhalb der Stadt geht es zum Stand-up-Paddling oder Kanufahren auf der Kromme Rijn in Amelisweerd, ab Botenverhuur De Rijnstroom.',
      },
      {
        kop: 'Und am Abend?',
        tekst:
          'Unsere Tage enden gegen 18 Uhr mit einem Umtrunk in der Innenstadt. Danach sind Sie mitten in der Altstadt, den Abend planen Sie also selbst: Essen gehen an den Werften der Gracht oder weiter durch die Stadt ziehen.',
      },
    ],
    faq: [
      { q: 'Mit wie vielen Personen ist es möglich?', a: GROEP },
      {
        q: 'Müssen alle schwimmen können?',
        a: 'Für Stand-up-Paddling ja: Schwimmen können ist Pflicht. Jeder bekommt eine Schwimmweste. Können nicht alle schwimmen, wählen Sie ein Paket in der Innenstadt.',
      },
      {
        q: 'Was kostet ein Junggesellenabschied in Utrecht?',
        a: `Bei uns ab ${vanaf('vrijgezellenfeest')} pro Person für einen Nachmittag und ${prijs('water-naar-borrel')} für einen ganzen Tag, inklusive MwSt. Den Preis jedes Pakets sehen Sie vorab.`,
      },
      {
        q: 'Passt es auch für einen Junggesellenabschied unter Männern?',
        a: 'Ja. Die Pakete sind für jede Freundesgruppe gedacht. Boule, Shuffleboard und Kanufahren mit Umtrunk oder Grillen danach passen für jede Runde.',
      },
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },
};
