# Intake-checklist Schuttevaer Rondvaartboten — koppeling dagjeutrecht.nl

**Doel:** dagjeutrecht.nl biedt rondvaart van Schuttevaer aan als los product óf als combi met andere arrangementen. Klant boekt op dagjeutrecht.nl, betaalt 1 factuur (WeFact) aan Manders. Manders rekent achteraf af met Schuttevaer.

**Systeem Schuttevaer:** FareHarbor (al bekend uit dagjesuppen-project — voordeel: zelfde API-pattern)

**Te bespreken met:** Schuttevaer (eigenaar + operationeel contact)
**Datum overleg:**
**Aanwezig:**

---

## 1. Commercieel & samenwerking

- [ ] Akkoord op reseller-constructie (dagjeutrecht verkoopt onder eigen merk)?
- [ ] Welke **vaarproducten** mag dagjeutrecht aanbieden? (open rondvaart / private charter / met catering / themavaart)
- [ ] **Inkoopprijzen** per producttype (incl./excl. btw)
- [ ] Combi-opties: borrel/hapjes/lunch aan boord — apart of in pakket?
- [ ] **Capaciteit per boot** (min/max personen) en aantal boten
- [ ] **Vaartijden / duur** (vaste blokken? maatwerk mogelijk?)
- [ ] **Vaargebied** + opstap-/uitstapplek (vast Oudegracht-locatie? meerdere?)
- [ ] **Exclusiviteit** — wel/niet exclusief voor dagjeutrecht in dit segment?
- [ ] Geldigheidsduur prijsafspraak

## 2. Operationeel

- [ ] **Vaartseizoen** (jaarrond? alleen apr–okt?)
- [ ] Hoe ver vooruit boekbaar?
- [ ] **Cut-off** voor laatste boeking vóór vertrek
- [ ] **Slechtweer-/laagwater-beleid** — wanneer wordt afgelast? Vergoeding of verzetten?
- [ ] Wie ontvangt boekingsbevestiging bij Schuttevaer?
- [ ] Wie is dag-contact bij wijziging / no-show / opstap-probleem?
- [ ] Communicatie naar gast: instructies opstap, parkeren, weersafhankelijke info — wie stuurt?
- [ ] **Schippers/bemanning** — geregeld door Schuttevaer, of moet dagjeutrecht iets weten?

## 3. Financieel & afrekening

- [ ] Hoe wil Schuttevaer **afgerekend** worden? (per boeking, wekelijks, maandelijks)
- [ ] Betaaltermijn factuur Schuttevaer → Manders
- [ ] BTW: 9% (personenvervoer) of 21% (charter/horeca aan boord)? Per onderdeel uitsplitsen?
- [ ] **Annuleringsvoorwaarden** Schuttevaer → Manders (staffel %)
- [ ] Wat bij no-show?
- [ ] Wat bij afgelasten door Schuttevaer (techniek/weer)? Volledige restitutie aan Manders?
- [ ] **Aanbetaling/borg** richting Schuttevaer?
- [ ] **Consumpties aan boord** boven arrangement — direct door gast, of via Manders?

## 4. FareHarbor-toegang (technisch)

- [ ] **FareHarbor account-naam (shortname)** van Schuttevaer
- [ ] **API-key** beschikbaar? (Schuttevaer moet die in FH-dashboard aanmaken/delen)
- [ ] Heeft Schuttevaer een **affiliate/reseller-programma** in FareHarbor? Dat is technisch de cleanste route:
  - Manders krijgt eigen affiliate-account
  - Boekingen lopen direct via FH API met affiliate-tracking
  - Commissie automatisch verrekend
- [ ] Welke **items/availabilities** zijn via API beschikbaar? Lijst per producttype.
- [ ] Ondersteunt Schuttevaer's FH-setup **custom fields** (bv. allergieën, opmerkingen klant)?
- [ ] Welke **velden** zijn verplicht bij booking-create?
- [ ] **Webhooks** geconfigureerd? (bv. notificatie bij annulering vanuit Schuttevaer-kant)
- [ ] Lopen er al **andere kanalen** op deze FH-installatie (eigen website, andere resellers)?

> **Tip:** FareHarbor heeft uitstekende publieke docs (fareharbor.com/help/external-api). Veel vragen kunnen we technisch zelf beantwoorden zodra we de shortname + API-key hebben.

## 5. Juridisch & risico

- [ ] Samenwerkings-/reseller-overeenkomst vastleggen
- [ ] **Aansprakelijkheid** tijdens vaart — wie is verantwoordelijk?
- [ ] Schuttevaer **verzekering** (P&I / passagiers) — bewijs opvragen
- [ ] **Veiligheidscertificaten** boten + schippersvaarbewijs — bewijs/kopie
- [ ] AVG: welke klantgegevens deelt Manders met Schuttevaer? (naam, aantal, evt. dieetwensen voor catering)
- [ ] Pakketreizenrichtlijn / garantiefonds — vooral relevant bij **multi-day** combi's of als arrangement vervoerselement bevat → toetsen
- [ ] Factuur naar eindklant op naam van dagjeutrecht/Manders

## 6. Marketing & content

- [ ] Foto's/video's van boten + vaargebied — mag dagjeutrecht gebruiken?
- [ ] Schuttevaer wel/niet bij naam noemen in productbeschrijving?
- [ ] Reviews — gedeeld of apart?

---

## Vergelijking met JdB-traject

| Aspect | JdB (SEM) | Schuttevaer (FareHarbor) |
|---|---|---|
| API-volwassenheid | Moeilijker (Connector, weinig publieke docs) | Goed (publieke API-docs, bekend uit dagjesuppen) |
| Affiliate-model | Onwaarschijnlijk | Mogelijk → mogelijk cleanere oplossing |
| Annulering | Reseller-deal | Idem, maar FH heeft annuleringsflow ingebouwd |
| Voorbeeld-implementatie | Nieuw bouwen | Hergebruik dagjesuppen.nl-patroon |

**Volgorde-advies:** start technisch met **Schuttevaer** (FareHarbor) — hergebruik van dagjesuppen-werk maakt MVP sneller live. JdB-koppeling daarna, want SEM-API moet eerst verkend worden.

---

## Vervolgstappen na intake

1. Antwoorden verwerken in beslissingsdocument
2. FareHarbor-shortname + API-key opvragen → eerste API-test
3. Beslissen: directe API-koppeling óf affiliate-route
4. Bouw-prompt schrijven (kan voor Schuttevaer mogelijk binnen 1 week zodra technische toegang er is)

---

**Notities tijdens overleg:**


