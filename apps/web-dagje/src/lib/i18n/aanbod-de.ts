/**
 * Duitse teksten bij aanbod.ts en bouwsteen-seo.ts.
 *
 * Geschreven voor Duitse groepen en bedrijven op stedentrip, niet letterlijk
 * vertaald, altijd met 'Sie'. Prijzen, aantallen, tijden en seizoenen komen uit
 * aanbod.ts; noemt een tekst een bedrag, dan via bouwsteenPrijs() zodat het nooit kan afwijken.
 * Een nieuw pakket of nieuwe bouwsteen: hier toevoegen, in aanbod-en.ts en in SLUGS (lib/talen.ts).
 */
import { bouwsteenPrijs } from './opmaak';
import type { AanbodTekst } from './types';

export const AANBOD_DE: AanbodTekst = {
  tijdvakken: {
    ontvangst: 'Empfang',
    ochtend: 'Vormittag',
    lunch: 'Mittagessen',
    middag: 'Nachmittag',
    afsluiting: 'Abschluss',
  },
  clusters: {
    centrum: {
      naam: 'Innenstadt',
      uitleg:
        'Rund um Paardenveld und die Oudegracht, zu Fuß erreichbar vom Bahnhof Utrecht Centraal (Hauptbahnhof).',
    },
    amelisweerd: {
      naam: 'Amelisweerd',
      uitleg:
        'Bei Botenverhuur De Rijnstroom, Weg naar Rhijnauwen 2, am Fluss Kromme Rijn im grünen Landgut Amelisweerd am Stadtrand.',
    },
    beide: {
      naam: 'Innenstadt und Amelisweerd',
      uitleg: 'Verbindet die Innenstadt mit Amelisweerd.',
    },
  },
  onderweg: 'Unterwegs',
  maanden: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  maandenSjabloon: '{van} bis {tot}',

  bouwstenen: {
    'koffie-met-gebak': {
      naam: 'Empfang mit Kaffee und Kuchen',
      kort: 'Ein entspannter Start mit Kaffee oder Tee und etwas Süßem.',
      beschrijving:
        'Die Gruppe trifft sich in der JEU de boules bar am Paardenveld, 5 Gehminuten vom Bahnhof Utrecht Centraal entfernt. Kaffee, Tee und Kuchen stehen bei Ihrer Ankunft bereit.',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '30 Min.',
      inclusief: ['Kaffee oder Tee', 'Kuchen'],
      seo: {
        titel: 'Gruppenempfang mit Kaffee und Kuchen in Utrecht',
        beschrijving:
          'Starten Sie den Tag mit Kaffee, Tee und Kuchen am Paardenveld, fünf Minuten von Utrecht Centraal. Für Gruppen ab 8 Personen.',
        tekst: [
          'Der Auftakt des Tages. Die Gruppe trifft sich in der JEU de boules bar am Paardenveld, fünf Gehminuten von Utrecht Centraal (Hauptbahnhof). So bringt ein verspäteter Zug nicht gleich das ganze Programm durcheinander.',
          'Eine halbe Stunde Kaffee, Tee und Kuchen. Danach beginnt der erste Programmpunkt.',
        ],
        vragen: [
          { q: 'Wann ist der Empfang?', a: 'Von 09:30 bis 10:00 Uhr.' },
          {
            q: 'Wo findet er statt?',
            a: 'In der JEU de boules bar am Paardenveld, fünf Gehminuten vom Bahnhof Utrecht Centraal.',
          },
        ],
      },
    },

    'jeu-de-boules': {
      naam: 'Boule mit Snacks',
      kort: '1,5 Stunden Boule auf überdachten Bahnen, mit Snacks.',
      beschrijving:
        'Gespielt wird drinnen auf den Bahnen der JEU de boules bar. Sie bekommen vor Ort eine Einführung, und die Gruppe spielt in Teams gegeneinander. Regen spielt keine Rolle.',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '1,5 Stunden',
      inclusief: ['Bahnmiete', 'Einführung', 'Snacks'],
      seo: {
        titel: 'Boule in Utrecht für Gruppen',
        beschrijving:
          'Anderthalb Stunden Indoor-Boule am Paardenveld, mit Snacks. Für Gruppen ab 8 Personen. Regen spielt keine Rolle.',
        tekst: [
          'Boule (Jeu de boules oder Pétanque) können Sie in Utrecht das ganze Jahr über spielen, denn die Bahnen am Paardenveld liegen drinnen. Damit ist es eine der wenigen Gruppenaktivitäten, bei denen das Wetter keine Rolle spielt, auch nicht im November.',
          'Die Gruppe spielt in Teams gegeneinander. Sie bekommen vor Ort eine Einführung, Vorkenntnisse sind also nicht nötig. Während des Spiels stehen Snacks auf dem Tisch. Bis Utrecht Centraal sind es fünf Gehminuten, praktisch, wenn die Gruppe mit dem Zug anreist.',
        ],
        vragen: [
          {
            q: 'Ist es drinnen oder draußen?',
            a: 'Drinnen, auf überdachten Bahnen. Regen oder Kälte spielen also keine Rolle.',
          },
          {
            q: 'Wie lange dauert es?',
            a: 'Anderthalb Stunden, einschließlich Einführung und Snacks.',
          },
          {
            q: 'Muss man das Spiel kennen?',
            a: 'Nein. Sie bekommen eine kurze Einführung, und nach zwei Würfen weiß jeder, wie es geht.',
          },
          { q: 'Wie weit ist es vom Bahnhof?', a: 'Etwa fünf Gehminuten von Utrecht Centraal.' },
        ],
      },
    },

    shuffleboard: {
      naam: 'Shuffleboard',
      kort: '1,5 Stunden Shuffleboard in The Grand Shuffle.',
      beschrijving:
        'Das Spiel, das Sie vielleicht von Kreuzfahrtschiffen kennen, in der ersten Shuffleboard-Bar der Niederlande. Schnell gelernt, mit viel Ehrgeiz gespielt.',
      locatie: 'The Grand Shuffle, Innenstadt Utrecht',
      duur: '1,5 Stunden',
      inclusief: ['Bahnen', 'Einführung'],
      seo: {
        titel: 'Shuffleboard in Utrecht für Gruppen',
        beschrijving:
          'Anderthalb Stunden Shuffleboard in der Innenstadt von Utrecht, für Gruppen ab 8 Personen. Bahnen und Einführung inklusive.',
        tekst: [
          'Shuffleboard ist schneller erklärt als Bowling, und man kann sich beim Spielen gut unterhalten. Deshalb eignet es sich für Gruppen, in denen sich nicht alle kennen, oder für Teams mit unterschiedlichen Altersgruppen.',
          'Sie spielen anderthalb Stunden auf den Bahnen von The Grand Shuffle in der Innenstadt. Alles findet drinnen statt. Ein Umtrunk am selben Tag lässt sich leicht anschließen, denn die Orte liegen zu Fuß nah beieinander.',
        ],
        vragen: [
          {
            q: 'Was ist Shuffleboard?',
            a: 'Ein Tischspiel, bei dem Sie Scheiben über eine lange, glatte Bahn schieben und versuchen, möglichst nah an den Rand zu kommen, ohne herunterzufallen.',
          },
          {
            q: 'Wie viele Personen pro Bahn?',
            a: 'Vier bis sechs. Für größere Gruppen reservieren wir mehrere Bahnen nebeneinander.',
          },
          {
            q: 'Geht das auch im Winter?',
            a: 'Ja, das ganze Jahr über. Alles findet drinnen statt.',
          },
        ],
      },
    },

    domtoren: {
      naam: 'Besteigung des Domturms',
      kort: 'Mit Führung 465 Stufen hinauf, mit Blick über die Stadt.',
      beschrijving:
        'Führung bis zur Spitze des Domturms, des höchsten Punkts von Utrecht. Nicht geeignet für Menschen mit Höhenangst oder eingeschränkter Mobilität.',
      locatie: 'Domplein',
      duur: '1 Stunde',
      inclusief: ['Eintritt', 'Führung'],
      seo: {
        titel: 'Domturm in Utrecht mit einer Gruppe besteigen',
        beschrijving:
          'Mit Führung 465 Stufen hinauf, mit Blick über Utrecht. Für Gruppen ab 8 Personen, Eintritt und Führung inklusive.',
        tekst: [
          'Mit 112 Metern ist der Domturm der höchste Kirchturm der Niederlande. Mit einer Führung steigen Sie 465 Stufen hinauf und stehen dann hoch über der Stadt, bei klarem Wetter mit Blick bis nach Amsterdam.',
          'Die Besteigung dauert eine Stunde und ist der einzige Programmpunkt, bei dem die Kondition eine Rolle spielt. Bei gemischten Gruppen planen wir ihn meist am Vormittag, wenn alle noch frisch sind.',
        ],
        vragen: [
          {
            q: 'Wie viele Stufen sind es?',
            a: '465. Der Aufstieg erfolgt in Etappen mit Pausen unterwegs.',
          },
          {
            q: 'Ist es für alle geeignet?',
            a: 'Sie sollten einigermaßen gut zu Fuß sein. Es gibt keinen Aufzug, und die Treppe ist schmal und steil.',
          },
          {
            q: 'Wie lange dauert es?',
            a: 'Etwa eine Stunde, einschließlich der Erklärungen der Führung.',
          },
        ],
      },
    },

    rondvaart: {
      naam: 'Grachtenfahrt',
      kort: 'Eine Stunde auf der Oudegracht und den Stadtgräben.',
      beschrijving:
        'Eine Grachtenfahrt mit Schuttevaer entlang der Werften der Oudegracht und über die Stadtgräben.',
      locatie: 'Anlegestelle an der Oudegracht',
      duur: '1 Stunde',
      inclusief: ['Grachtenfahrt'],
      seo: {
        titel: 'Grachtenfahrt in Utrecht für Gruppen',
        beschrijving:
          'Eine Stunde auf der Oudegracht und den Stadtgräben, mit Ihrer Gruppe ab 8 Personen. Einstieg in der Innenstadt, fester Preis pro Person.',
        tekst: [
          'Eine Stunde auf der Oudegracht und den Stadtgräben, vorbei an den Werftkellern, die man nur vom Wasser aus richtig sieht. Diese alten Keller auf Wasserhöhe gibt es so nur in Utrecht. Für Gruppen ist das der Programmpunkt, bei dem alle einmal sitzen und sich unterhalten, meist zwischen zwei aktiveren Blöcken.',
          'Sie steigen in der Innenstadt ein, zu Fuß nah an den anderen Programmpunkten. Praktisch als Start in den Tag oder als ruhige Pause nach dem Mittagessen.',
        ],
        vragen: [
          { q: 'Wie lange dauert die Grachtenfahrt?', a: 'Eine Stunde.' },
          {
            q: 'Ist das Boot überdacht?',
            a: 'Ja, es gibt ein Dach, die Fahrt findet also auch bei Regen statt.',
          },
          {
            q: 'Kann man an Bord etwas trinken?',
            a: 'Getränke sind in diesem Programmpunkt nicht enthalten. Für Getränke kombinieren Sie die Fahrt mit dem Abschluss-Umtrunk danach.',
          },
        ],
      },
    },

    groepslunch: {
      naam: 'Gruppen-Mittagessen',
      kort: 'Festes Mittagsmenü, auch vegetarisch.',
      beschrijving:
        'Ein festes Gruppen-Mittagessen in einem der Lokale der Brothers Horeca Groep in der Innenstadt. Vegetarisch ist möglich; andere Ernährungswünsche können Sie bei der Buchung angeben.',
      locatie: 'BHG-Lokal in der Innenstadt',
      duur: '1 Stunde',
      inclusief: ['festes Mittagsmenü', 'Softdrink oder Kaffee'],
      seo: {
        titel: 'Gruppen-Mittagessen in der Innenstadt von Utrecht',
        beschrijving:
          'Festes Mittagsmenü für Gruppen ab 8 Personen in einem festen Lokal in der Innenstadt von Utrecht. Auch vegetarisch.',
        tekst: [
          'Ein festes Mittagsmenü in einem festen Lokal in der Innenstadt, damit Sie vorher wissen, was es kostet und wie lange es dauert. Eine Stunde, einschließlich Softdrink oder Kaffee.',
          'Vegetarisch ist ohne Aufpreis möglich. Teilen Sie uns bei der Buchung mit, für wie viele Personen.',
        ],
        vragen: [
          { q: 'Wie lange dauert das Mittagessen?', a: 'Eine Stunde, von 12:30 bis 13:30 Uhr.' },
          { q: 'Ist vegetarisch möglich?', a: 'Ja, ohne Aufpreis. Bitte bei der Buchung angeben.' },
          {
            q: 'Wo findet es statt?',
            a: 'In einem festen Gastronomiebetrieb in der Innenstadt von Utrecht, zu Fuß nah an den anderen Programmpunkten.',
          },
        ],
      },
    },

    borrel: {
      naam: 'Abschluss-Umtrunk',
      kort: '2 Getränke mit Bitterballen.',
      beschrijving:
        'Lassen Sie den Tag auf niederländische Art ausklingen, mit einem Umtrunk (auf Niederländisch "Borrel") in der JEU de boules bar: zwei Getränke pro Person und Bitterballen (frittierte niederländische Fleischkroketten).',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '1 Stunde',
      inclusief: ['2 Getränke pro Person', 'Bitterballen'],
      seo: {
        titel: 'Umtrunk für Gruppen in Utrecht',
        beschrijving:
          'Abschluss-Umtrunk mit zwei Getränken pro Person und Bitterballen am Paardenveld. Für Gruppen ab 8 Personen, fester Preis pro Person.',
        tekst: [
          'Der Abschluss des Tages, in den Niederlanden "Borrel" genannt: zwei Getränke pro Person mit Bitterballen (frittierte niederländische Fleischkroketten), in der JEU de boules bar am Paardenveld. Fester Preis, also keine Rechnung am Ende, die höher ausfällt als gedacht.',
          'Fünf Gehminuten von Utrecht Centraal (Hauptbahnhof), praktisch, wenn die Gruppe danach den Zug nimmt.',
        ],
        vragen: [
          { q: 'Wie viele Getränke sind enthalten?', a: 'Zwei pro Person, dazu Bitterballen.' },
          { q: 'Kann man mehr trinken?', a: 'Ja, weitere Getränke bezahlen Sie vor Ort.' },
          { q: 'Wann ist der Umtrunk?', a: 'Im Abschluss-Zeitfenster, von 16:30 bis 18:00 Uhr.' },
        ],
      },
    },

    gluhwein: {
      naam: 'Empfang mit Glühwein',
      kort: 'Aufwärmen mit Glühwein oder heißer Schokolade.',
      beschrijving:
        'Die Gruppe trifft sich in der JEU de boules bar am Paardenveld. Jeder bekommt einen Glühwein oder eine heiße Schokolade mit einer Kleinigkeit dazu.',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '30 Min.',
      inclusief: ['Glühwein oder heiße Schokolade', 'eine Kleinigkeit dazu'],
      seo: {
        titel: 'Glühwein-Empfang für Gruppen in Utrecht',
        beschrijving:
          'Winterlicher Empfang mit Glühwein oder heißer Schokolade am Paardenveld. Für Gruppen ab 8 Personen, November bis März.',
        tekst: [
          'Die Winterversion des Empfangs: Glühwein oder heiße Schokolade mit einer Kleinigkeit dazu, drinnen am Paardenveld.',
          'Dieser Programmpunkt läuft von November bis März und gehört fest zum Winterpaket Warmer Wintertag.',
        ],
        vragen: [
          { q: 'Gibt es auch etwas ohne Alkohol?', a: 'Ja, heiße Schokolade ist die Alternative.' },
          { q: 'Wann ist das möglich?', a: 'Von November bis März.' },
        ],
      },
    },

    winterlunch: {
      naam: 'Winterliches Mittagessen',
      kort: 'Erbsensuppe oder Stamppot, auch vegetarisch.',
      beschrijving:
        'Ein deftiges niederländisches Wintermittagessen in einem der Lokale der Brothers Horeca Groep: Erwtensoep (dicke Erbsensuppe) oder Stamppot (Kartoffelstampf mit Gemüse), mit vegetarischer Auswahl.',
      locatie: 'BHG-Lokal in der Innenstadt',
      duur: '1 Stunde',
      inclusief: ['Erbsensuppe oder Stamppot', 'Softdrink oder Kaffee'],
      seo: {
        titel: 'Niederländisches Wintermittagessen für Gruppen in Utrecht',
        beschrijving:
          'Erbsensuppe oder Stamppot für Gruppen ab 8 Personen in der Innenstadt von Utrecht. Auch vegetarisch, November bis März.',
        tekst: [
          'Erwtensoep (niederländische Erbsensuppe) oder Stamppot (Kartoffelstampf mit Gemüse) in einem festen Lokal in der Innenstadt, als Mittagessen zwischen zwei winterlichen Programmpunkten.',
          'Vegetarisch ist möglich. Dieser Programmpunkt läuft von November bis März.',
        ],
        vragen: [
          { q: 'Was wird serviert?', a: 'Erbsensuppe oder Stamppot, mit Softdrink oder Kaffee.' },
          { q: 'Ist vegetarisch möglich?', a: 'Ja, bitte bei der Buchung angeben.' },
        ],
      },
    },

    'city-challenge': {
      naam: 'City Challenge durch die Altstadt',
      kort: 'In Teams durch die Altstadt, mit Aufgaben unterwegs.',
      beschrijving:
        'Die Gruppe zieht in Teams durch die Altstadt, mit einer Reihe von Aufgaben und Fragen zu dem, was sie unterwegs entdeckt: den Dom, die Werftkeller und die Oudegracht. Zu Fuß, im eigenen Tempo, mit festem Start und Ziel. Wir sorgen für die Aufgaben und sind bei Start und Ziel vor Ort.',
      locatie: 'Start am Paardenveld, Ziel an der Neude',
      duur: '1,5 bis 2 Stunden',
      inclusief: ['Aufgaben für jedes Team', 'Betreuung bei Start und Ziel', 'Auswertung am Ende'],
      seo: {
        titel: 'City Challenge Utrecht: Stadtspiel für Gruppen',
        beschrijving: `In Teams durch die Altstadt von Utrecht, mit Aufgaben zum Dom, zu den Werftkellern und zur Oudegracht. Ab 8 Personen, ${bouwsteenPrijs('de', 'city-challenge')} pro Person.`,
        tekst: [
          'Eine City Challenge ist ein Stadtspiel: Die Gruppe zieht in Teams durch die Altstadt, mit Aufgaben und Fragen zu dem, was ihr unterwegs begegnet. Der Dom, die Werftkeller und die Oudegracht sind alle dabei. Zu Fuß, im eigenen Tempo.',
          'Es ist kein Escape Room und keine Stadtführung. Sie sind selbst unterwegs; wir sorgen für die Aufgaben und sind bei Start und Ziel vor Ort, um die Auswertung zu besprechen. Start ist am Paardenveld, Ziel auf dem Platz Neude.',
        ],
        vragen: [
          {
            q: 'Wie lange dauert eine City Challenge?',
            a: 'Anderthalb bis zwei Stunden, je nachdem, wie schnell die Teams vorankommen.',
          },
          {
            q: 'Wie groß sind die Teams?',
            a: 'Vier bis sechs Personen pro Team. Bei 8 Personen spielen also zwei Teams gegeneinander.',
          },
          {
            q: 'Gibt es eine Führung?',
            a: 'Nicht unterwegs. Wir sind bei Start und Ziel vor Ort; dazwischen sind die Teams selbstständig unterwegs.',
          },
          {
            q: 'Was kostet es?',
            a: `${bouwsteenPrijs('de', 'city-challenge')} pro Person. Das ist unser günstigster Programmpunkt.`,
          },
        ],
      },
    },

    kanoen: {
      naam: 'Kanufahren in Amelisweerd',
      kort: '2 Stunden Kanufahren auf der Kromme Rijn.',
      beschrijving:
        'Zu zweit im Kanu auf der Kromme Rijn durch das Landgut Amelisweerd. Schwimmwesten und wasserdichte Beutel sind inklusive.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '2 Stunden',
      inclusief: ['Zweierkanu', 'Schwimmweste', 'wasserdichter Beutel'],
      seo: {
        titel: 'Kanufahren mit einer Gruppe in Utrecht',
        beschrijving:
          'Zwei Stunden Kanufahren auf der Kromme Rijn durch Amelisweerd, für Gruppen ab 8 Personen. Kanu, Schwimmweste und wasserdichter Beutel inklusive.',
        tekst: [
          'Kanufahren bei Utrecht heißt: auf der Kromme Rijn, einem kleinen Fluss, der sich mitten durch das Landgut Amelisweerd schlängelt. Sie paddeln unter alten Bäumen hindurch und kommen am Teegarten bei Rhijnauwen vorbei. Es ist einer der wenigen Orte rund um die Stadt, an denen eine Gruppe zwei Stunden paddeln kann, ohne Motorbooten zu begegnen.',
          'Sie fahren zu zweit im Kanu. Das passt gut, wenn Sie Kolleginnen und Kollegen zusammenbringen möchten, die sich noch nicht kennen. Schwimmwesten und ein wasserdichter Beutel für Handys sind dabei.',
        ],
        vragen: [
          {
            q: 'Wie viele Personen pro Kanu?',
            a: 'Zwei. Bei einer ungeraden Gruppengröße setzen wir ein Kanu mit drei Plätzen ein.',
          },
          {
            q: 'Braucht man Erfahrung?',
            a: 'Nein. Sie bekommen vor der Abfahrt eine Einführung, und die Route ist einfach: hin und zurück auf demselben Gewässer.',
          },
          {
            q: 'Was ist, wenn es regnet?',
            a: 'Kanufahren findet auch bei Regen statt. Nur bei Gewitter oder starkem Wind weichen wir auf einen Programmpunkt drinnen aus.',
          },
          {
            q: 'Lässt es sich mit Grillen kombinieren?',
            a: 'Ja. Das Grillen mit zwei Stunden Getränken findet am selben Ort bei De Rijnstroom statt und ist ab 15 Personen möglich.',
          },
        ],
      },
    },

    suppen: {
      naam: 'Stand-up-Paddling in Amelisweerd',
      kort: '2 Stunden Stand-up-Paddling (SUP) auf der Kromme Rijn.',
      beschrijving:
        'Jeder bekommt ein eigenes SUP-Board auf dem ruhigen Wasser der Kromme Rijn. Schwimmen können ist Voraussetzung.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '2 Stunden',
      inclusief: ['SUP-Board', 'Paddel', 'Schwimmweste'],
      seo: {
        titel: 'Stand-up-Paddling mit einer Gruppe in Utrecht',
        beschrijving:
          'Stand-up-Paddling (SUP) auf der Kromme Rijn bei Amelisweerd, für Gruppen ab 8 Personen. Board, Paddel und Schwimmweste inklusive. Fester Preis pro Person.',
        tekst: [
          'Am ruhigsten paddeln Sie in Utrecht auf der Kromme Rijn. Keine vollen Grachten mit Ausflugsbooten, sondern stilles Wasser durch das Landgut Amelisweerd, auf dem die Gruppe zusammenbleiben kann. Jeder bekommt ein eigenes Board, niemand muss teilen.',
          'Dieser Programmpunkt ist für Gruppen ab 8 Personen gedacht und dauert zwei Stunden. Sie können ihn einzeln buchen oder mit einem Picknick am Wasser oder Grillen zum Abschluss kombinieren. Suchen Sie ein Board nur für sich oder zu zweit, sind Sie hier nicht richtig: Wir arbeiten nur mit Gruppen.',
        ],
        vragen: [
          {
            q: 'Muss man SUP können?',
            a: 'Nein. Die meisten stehen innerhalb von zehn Minuten. Das Wasser der Kromme Rijn ist ruhig und flach, ein Sturz ist also kein Problem.',
          },
          {
            q: 'Muss man schwimmen können?',
            a: 'Ja, das ist Pflicht. Jeder bekommt eine Schwimmweste, aber Schwimmen können ist Voraussetzung für die Teilnahme.',
          },
          {
            q: 'Ab wie vielen Personen ist es möglich?',
            a: 'Ab 8 Personen, bis maximal 30. Sie buchen pro Person.',
          },
          {
            q: 'Geht das das ganze Jahr?',
            a: 'Nein, Stand-up-Paddling ist von April bis Oktober möglich. Im Winter wählen Sie zum Beispiel Boule oder Shuffleboard.',
          },
        ],
      },
    },

    picknick: {
      naam: 'Picknick am Wasser',
      kort: 'Picknickpaket bei De Rijnstroom.',
      beschrijving: 'Ein Picknickpaket pro Person, abzuholen bei De Rijnstroom.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '1 Stunde',
      inclusief: ['Picknickpaket pro Person'],
      seo: {
        titel: 'Gruppenpicknick in Amelisweerd',
        beschrijving:
          'Ein Picknickpaket pro Person bei De Rijnstroom an der Kromme Rijn. Für Gruppen ab 8 Personen.',
        tekst: [
          'Das Picknick ist die Mittagsvariante für Tage am Wasser. Sie holen die Pakete bei De Rijnstroom ab und essen an der Kromme Rijn, im Grünen von Amelisweerd.',
          'Die entspannteste Art, den Tag zu teilen: nach dem Kanufahren oder Paddeln eine Weile sitzen und danach weitermachen.',
        ],
        vragen: [
          {
            q: 'Was ist im Paket?',
            a: 'Ein Picknickpaket pro Person. Ernährungswünsche bitte bei der Buchung angeben.',
          },
          { q: 'Wo wird gegessen?', a: 'Bei De Rijnstroom an der Kromme Rijn, in Amelisweerd.' },
          {
            q: 'Geht das auch im Winter?',
            a: 'Nein, das Picknick gibt es von April bis Oktober. Im Winter gibt es ein winterliches Mittagessen in der Innenstadt.',
          },
        ],
      },
    },

    bbq: {
      naam: 'Grillen mit Getränken',
      kort: 'Grillen zum Abschluss, 2 Stunden Getränke.',
      beschrijving:
        'Zum Abschluss wird bei De Rijnstroom gegrillt, einschließlich 2 Stunden Getränke ohne Limit. Ab 15 Personen.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '2 Stunden',
      inclusief: ['Grillpaket', '2 Stunden Getränke'],
      seo: {
        titel: 'Grillen mit einer Gruppe in Utrecht',
        beschrijving:
          'Grillen bei De Rijnstroom in Amelisweerd mit zwei Stunden Getränken ohne Limit. Für Gruppen ab 15 Personen, fester Preis pro Person.',
        tekst: [
          'Das Grillen ist der Abschluss bei De Rijnstroom an der Kromme Rijn, draußen am Wasser in Amelisweerd. Zwei Stunden Getränke ohne Limit sind dabei, Sie müssen hinterher also nichts nachrechnen.',
          'Dieser Programmpunkt ist ab 15 Personen möglich, mehr als bei den anderen. Er passt ideal zu Kanufahren oder Stand-up-Paddling am selben Ort: aus dem Wasser und direkt an den Tisch.',
        ],
        vragen: [
          { q: 'Ab wie vielen Personen?', a: 'Ab 15 Personen, bis maximal 40.' },
          {
            q: 'Sind Getränke inklusive?',
            a: 'Ja, zwei Stunden Getränke ohne Limit sind im Preis enthalten.',
          },
          {
            q: 'Gibt es eine vegetarische Option?',
            a: 'Ja, geben Sie bei der Buchung an, wie viele Personen vegetarisch essen.',
          },
          {
            q: 'Geht das auch im Winter?',
            a: 'Nein, Grillen ist von April bis Oktober möglich. Im Winter schließen Sie mit einem Umtrunk in der Innenstadt ab.',
          },
        ],
      },
    },

    'kickbike-tocht': {
      naam: 'Kickbike-Tour',
      kort: 'Selbstständig auf dem Kickbike, auf einer festen Route.',
      beschrijving:
        'Die Gruppe fährt selbstständig eine feste Route entlang der Kromme Rijn zwischen der Innenstadt und Amelisweerd. Die Kickbikes stehen mit Schloss bereit; Code und Route bekommen Sie am Tag vorher.',
      locatie: 'Start laut Route (Innenstadt oder De Rijnstroom)',
      duur: '1,5 bis 2 Stunden',
      inclusief: ['Kickbike', 'Schloss', 'Route'],
      seo: {
        titel: 'Kickbike-Tour in Utrecht für Gruppen',
        beschrijving:
          'Selbstständig eine feste Route entlang der Kromme Rijn zwischen Innenstadt und Amelisweerd. Für Gruppen ab 8 Personen.',
        tekst: [
          'Die Kickbike-Tour verbindet die beiden Orte, an denen sich der restliche Tag abspielt: die Innenstadt und Amelisweerd. Sie fahren selbstständig eine feste Route entlang der Kromme Rijn, etwa anderthalb bis zwei Stunden.',
          'Die Kickbikes stehen mit Schloss bereit; Code und Route bekommen Sie am Tag vorher. Möchten Sie nur Kickbikes mieten, ohne Programm drumherum, etwa für einen Nachmittag oder ein Wochenende? Dann schauen Sie auf stepverhuurutrecht.nl (auf Niederländisch).',
        ],
        vragen: [
          {
            q: 'Was ist ein Kickbike?',
            a: 'Ein großer Tretroller mit Fahrradrädern. Sie stehen darauf und stoßen sich mit einem Fuß ab; schneller und bequemer als ein normaler Roller.',
          },
          {
            q: 'Gibt es unterwegs eine Begleitung?',
            a: 'Nein, die Gruppe fährt selbstständig. Route und Schlosscode bekommen Sie vorab.',
          },
          {
            q: 'Ich möchte nur Kickbikes mieten, geht das hier?',
            a: 'Nicht über diese Seite. Für die reine Vermietung ohne Programm gehen Sie zu stepverhuurutrecht.nl.',
          },
        ],
        verwijzing: {
          tekst: 'Nur Kickbikes mieten, ohne Programm drumherum?',
          href: 'https://stepverhuurutrecht.nl',
          link: 'Zu Stepverhuur Utrecht (auf Niederländisch)',
        },
      },
    },
  },

  pakketten: {
    'warme-winterdag': {
      naam: 'Warmer Wintertag',
      kort: 'Glühwein, Domturm, winterliches Mittagessen, Boule und Umtrunk.',
      beschrijving:
        'Ein Wintertag in der Innenstadt von Utrecht, größtenteils drinnen. Aufwärmen mit Glühwein, die Stadt vom Domturm aus sehen, niederländische Erbsensuppe oder Stamppot und danach Boule spielen bis zum Umtrunk.',
      voorWie: 'Firmenausflüge, Teams und Freundesgruppen',
    },
    'amelisweerd-actief': {
      naam: 'Amelisweerd Aktiv',
      kort: 'Kanufahren, Picknick, Kickbike-Tour und Grillen. Den ganzen Tag draußen.',
      beschrijving:
        'Ein aktiver Tag im Grünen am Stadtrand von Utrecht. Alles findet bei und rund um De Rijnstroom statt, also kein Hin und Her zwischen verschiedenen Orten.',
      voorWie: 'Teams, Freundesgruppen und Studentenverbindungen',
    },
    'spel-en-borrel': {
      naam: 'Utrecht Spiel & Umtrunk',
      kort: 'Kaffee, Boule, Mittagessen, Shuffleboard und Umtrunk.',
      beschrijving:
        'Den ganzen Tag drinnen spielen und genießen in der Innenstadt, also wetterfest. Alles ist zu Fuß vom Bahnhof Utrecht Centraal erreichbar.',
      voorWie: 'Firmenausflüge und Teambuilding, das ganze Jahr',
    },
    'water-naar-borrel': {
      naam: 'Vom Wasser zum Umtrunk',
      kort: 'Stand-up-Paddling, Picknick, mit dem Kickbike in die Stadt und Umtrunk.',
      beschrijving:
        'Am Vormittag auf dem Wasser in Amelisweerd, nach dem Picknick mit dem Kickbike entlang der Kromme Rijn in die Innenstadt und zum Abschluss ein Umtrunk in der JEU.',
      voorWie: 'Junggesellenabschiede (JGA) und Freundesgruppen',
    },
    schooluitje: {
      naam: 'Schulausflug Utrecht',
      kort: 'Domturm, Gruppen-Mittagessen und eine Grachtenfahrt.',
      beschrijving:
        'Das historische Herz von Utrecht: auf den Domturm steigen, gemeinsam zu Mittag essen und die Stadt vom Wasser aus sehen.',
      voorWie: 'Schulklassen der Sekundarstufe und Berufsschulen',
    },
    'boules-en-borrel': {
      naam: 'Boule & Umtrunk',
      kort: 'Halber Tag: Boule mit Snacks und ein Abschluss-Umtrunk.',
      beschrijving:
        'Ein unkomplizierter Nachmittag: um 14 Uhr auf die Bahnen der JEU de boules bar am Paardenveld, mit Snacks, und zum Abschluss ein Umtrunk. Fünf Gehminuten vom Bahnhof Utrecht Centraal, so kann jeder leicht dazukommen und wieder gehen.',
      voorWie: 'Teams und Freundesgruppen mit einem freien Nachmittag',
    },
    'dom-en-grachten': {
      naam: 'Domturm & Grachten',
      kort: 'Halber Tag: auf den Domturm und eine Grachtenfahrt.',
      beschrijving:
        'Das alte Herz von Utrecht in einem halben Tag: zuerst die 465 Stufen des Domturms hinauf für die Aussicht, danach vom Wasser aus an den Werftkellern vorbei. Wenig Organisation, viel Stadt.',
      voorWie: 'Schulklassen, Familien und Gruppen von außerhalb',
    },
    'water-en-picknick': {
      naam: 'Wasser & Picknick',
      kort: 'Halber Tag: Kanufahren durch Amelisweerd und ein Picknick am Wasser.',
      beschrijving:
        'Ein Vormittag auf der Kromme Rijn, zu zweit im Kanu, und danach ein Picknick am Wasser bei De Rijnstroom. Um halb zwei sind alle wieder frei.',
      voorWie: 'Teams und Freundesgruppen, April bis Oktober',
    },
    'winter-op-de-grachten': {
      naam: 'Winter auf den Grachten',
      kort: 'Halber Tag: Glühwein, eine Grachtenfahrt mit Schuttevaer und ein winterliches Mittagessen.',
      beschrijving:
        'Utrecht im Winter vom Wasser aus. Aufwärmen mit Glühwein in der JEU de boules bar, eine Stunde mit der Rederij Schuttevaer über die Oudegracht und die Singel, und zum Abschluss Erbsensuppe oder Stamppot. Um halb zwei sind alle wieder frei.',
      voorWie: 'Firmenausflüge, Teams und Familien, November bis März',
    },
    winterborrel: {
      naam: 'Winter-Umtrunk',
      kort: 'Halber Tag: Glühwein, Boule drinnen und ein Umtrunk.',
      beschrijving:
        'Ein Winternachmittag, der nicht vom Wetter abhängt: Ankommen mit Glühwein, Boule auf den überdachten Bahnen und zum Abschluss ein Umtrunk. Alles drinnen, alles in der Innenstadt.',
      voorWie: 'Teams und Freundesgruppen, November bis März',
    },
    'koffie-en-city-challenge': {
      naam: 'Kaffee & City Challenge',
      kort: 'Halber Vormittag: Kaffee und Kuchen, dann in Teams durch die Altstadt.',
      beschrijving:
        'Die günstigste Art, mit einer Gruppe in Utrecht etwas gemeinsam zu unternehmen. Um halb zehn Kaffee und Kuchen in der JEU de boules bar, um zehn in Teams mit der City Challenge durch die Altstadt, gegen zwölf fertig. Keine Reservierungen bei Dritten, daher auch kurzfristig möglich.',
      voorWie: 'Teams, Klassen und Freundesgruppen mit einem Vormittag und kleinem Budget',
    },
    'schoolreis-basisschool': {
      naam: 'Grundschulausflug',
      kort: 'Eine Grachtenfahrt und eine City Challenge, Mittagessen selbst mitbringen.',
      beschrijving:
        'Utrecht vom Wasser aus, mit einem Schiffer, der unterwegs von den Werftkellern und dem Dom erzählt. Am Nachmittag ziehen die Kinder in Teams mit der City Challenge durch die Altstadt. Keine Treppen und keine langen Wege, daher geeignet ab der niederländischen "groep 6" (etwa 9 Jahre). Eigenes Mittagessen mitbringen, oder das Gruppen-Mittagessen bei der Planung hinzufügen.',
      voorWie: 'Grundschulen, niederländische "groep" 6 bis 8 (etwa 9 bis 12 Jahre)',
    },
    'vrijgezellen-winterdag': {
      naam: 'JGA-Wintertag',
      kort: 'Glühwein, Shuffleboard, winterliches Mittagessen und Umtrunk.',
      beschrijving:
        'Die Winterversion des Junggesellenabschieds, komplett drinnen. Beginnen mit Glühwein, dann Shuffleboard in The Grand Shuffle, ein warmes Mittagessen und zum Abschluss ein Umtrunk in der JEU. Gleicher Preis wie das Sommerpaket.',
      voorWie: 'Junggesellenabschiede (JGA) und Freundesgruppen, November bis März',
    },
  },
};
