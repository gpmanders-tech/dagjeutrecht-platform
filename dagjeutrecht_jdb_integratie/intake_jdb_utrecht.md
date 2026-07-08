# Intake-checklist Jeu de Boules Utrecht — koppeling dagjeutrecht.nl

**Doel:** dagjeutrecht.nl verkoopt combi-arrangementen (sup/kano via dagjesuppen + JdB met borrel). Klant boekt op 1 site, betaalt 1 factuur (WeFact) aan Manders. Manders rekent achteraf af met JdB en dagjesuppen.

**Te bespreken met:** Jeu de Boules Utrecht (eigenaar + technisch contact SEM)
**Datum overleg:**
**Aanwezig:**

---

## 1. Commercieel & samenwerking

- [ ] Akkoord op reseller-constructie (dagjeutrecht verkoopt onder eigen merk, klant ziet JdB niet als verkoper)?
- [ ] Welke producten mag dagjeutrecht aanbieden? (banen los / met borrel / hapjes / volledige arrangementen)
- [ ] **Inkoopprijzen** voor dagjeutrecht per product (incl./excl. btw)
- [ ] Bestaat er een **vaste arrangementsprijs** of stapelen we per onderdeel?
- [ ] Minimum / maximum **groepsgrootte** per product
- [ ] Tijdsblokken (vaste blokken van x uur, of flexibel)
- [ ] **Exclusiviteit** — mag dagjeutrecht JdB verkopen of werken er meer partners?
- [ ] Geldigheidsduur prijsafspraak (1 jaar? seizoen?)

## 2. Operationeel

- [ ] **Openingstijden** + uitzonderingen (feestdagen, sluitingsperiodes)
- [ ] Hoe ver vooruit kan geboekt worden? (3 mnd / 1 jaar / ongelimiteerd)
- [ ] **Cut-off**: tot hoe laat vóór aanvang nog boekbaar?
- [ ] Wie ontvangt de **boekingsbevestiging** bij JdB? (mail + telefoon)
- [ ] Wie is **dag-contact** bij wijziging of no-show?
- [ ] Hoe gaat JdB om met **slecht weer** (sup/kano gaat dan misschien niet door — wat doen we met de JdB-kant van de boeking)?
- [ ] Communicatie naar de gast: stuurt dagjeutrecht alle info, of stuurt JdB ook nog iets?

## 3. Financieel & afrekening

- [ ] Hoe wil JdB **afgerekend** worden? (per boeking, wekelijks, maandelijks)
- [ ] **Betaaltermijn** factuur JdB → Manders
- [ ] BTW: hoog/laag tarief per onderdeel (banen vs. horeca verschillen vaak)
- [ ] **Annuleringsvoorwaarden** JdB → Manders (staffel %)
- [ ] Wat bij **no-show** van gast? (volledige doorbelasting?)
- [ ] **Aanbetaling/borg** vereist door JdB richting Manders?
- [ ] Welke **bar-afrekening** (consumpties boven arrangement) — direct door gast aan bar, of via Manders?

## 4. SEM-toegang (technisch — kern van de bouw)

- [ ] Welke **editie/versie** van Smart Event Manager gebruikt JdB?
- [ ] Heeft JdB de **Connector-licentie** actief? (zo niet: kosten + activatietijd opvragen bij SEM)
- [ ] **API-credentials** beschikbaar? (key / secret / endpoint URL)
- [ ] Is er een **test/sandbox-omgeving** of alleen live?
- [ ] **Documentatie** beschikbaar (PDF, link, of via SEM-support)?
- [ ] Welke **endpoints** zijn beschikbaar:
  - [ ] beschikbaarheid opvragen (banen + arrangement op datum/tijd)
  - [ ] reservering aanmaken
  - [ ] reservering wijzigen
  - [ ] reservering annuleren
  - [ ] producten/prijzen ophalen
- [ ] Ondersteunt SEM **webhooks** (notificatie bij wijziging vanuit JdB-kant)?
- [ ] Lopen er al andere **koppelingen** op deze SEM-installatie (om conflicten te vermijden)?
- [ ] Technisch contact bij SEM-leverancier (naam + mail) voor bouwvragen
- [ ] Technisch contact bij JdB (wie kent het systeem) — naam + mail

## 5. Juridisch & risico

- [ ] **Samenwerkings-/reseller-overeenkomst** vastleggen (kort document volstaat)
- [ ] **Aansprakelijkheid** bij ongeval/schade tijdens JdB-activiteit — wie is verantwoordelijk?
- [ ] JdB **verzekering** WA / ongevallen — bewijs opvragen
- [ ] **AVG**: welke klantgegevens deelt Manders met JdB (naam, aantal, eventueel allergieën)? Verwerkersovereenkomst nodig?
- [ ] Pakketreizenrichtlijn / garantiefonds — toetsen of combi sup+JdB+borrel onder pakketreis valt (zelfde risico-aandachtspunt als schooluitjes)
- [ ] Wie staat op de **factuur naar de eindklant**? (dagjeutrecht/Manders — niet JdB)

## 6. Marketing & content

- [ ] Mag dagjeutrecht **foto's/teksten** van JdB-locatie gebruiken op site?
- [ ] Hoe wordt JdB in de productbeschrijving genoemd (wel/niet bij naam)?
- [ ] Reviews/feedback van gasten — wie verzamelt en deelt?

---

## Vervolgstappen na intake

1. Antwoorden verwerken in **beslissingsdocument** (1 A4)
2. Daarna: **bouw-prompt** schrijven voor Claude met:
   - API-credentials + endpoint-overzicht (uit punt 4)
   - Productenlijst + prijslogica (uit punt 1)
   - Boekings- en annuleringsregels (uit punt 2 + 3)
   - Scope MVP: offerte-flow eerst (zoals dagjesuppen), live-boeking in fase 2
3. Parallel: korte **samenwerkingsovereenkomst** opstellen (punt 5)

---

**Notities tijdens overleg:**


