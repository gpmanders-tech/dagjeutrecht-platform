# MASTERPROMPT — Utrecht Platform Groep (4 domeinen)

> Geef deze volledige prompt aan Claude Code. Bouw als monorepo met gedeelde backend.

---

## 1. PROJECTOVERZICHT

Bouw één platform-ecosysteem onder 4 domeinen met gedeelde database, boekingsengine en beheerpaneel:

| Domein | Doelgroep | Focus |
|---|---|---|
| **UtrechtNow.nl** | B2C consument | Hoofdplatform: alle activiteiten, events, wellness, webshop. "Dé digitale VVV van Utrecht" |
| **DagjeUtrecht.nl** | B2C consument | Kant-en-klare dagroutes & arrangementen (landing/funnel naar UtrechtNow-engine) |
| **NachtjeUtrecht.nl** | B2C consument | Hotels & overnachting-arrangementen (hotel + activiteit + diner pakketten) |
| **UtrechtIncoming.nl** | B2B touroperators/DMC | Partnerportal met login, nettoprijzen, groepsaanvragen, vouchers. Duits primair |

Alle vier draaien op dezelfde backend/database. Eén beheerpaneel (Nederlands) voor de eigenaar.

**Talen (7):** Nederlands (default), Engels, Duits, Frans, Spaans, Italiaans, Portugees. UtrechtIncoming.nl: Duits default. Taalkeuze via i18n-routing (`/de/`, `/en/` …), hreflang-tags voor SEO.

---

## 2. BUSINESS-REGELS (KRITIEK — exact implementeren)

### 2.1 Marge (verborgen)
- `MARGIN = 0.10` (10%) als configureerbare instelling in beheerpaneel (per categorie/leverancier overschrijfbaar)
- Klantprijs = `ceil(inkoopprijs × 1.10)` — klant ziet ALLEEN eindprijs
- Het woord "marge"/"servicekosten" verschijnt NERGENS in klant-UI, e-mails of vouchers
- B2B (UtrechtIncoming): touroperators zien nettoprijzen = inkoopprijs + kleinere B2B-marge (apart instelbaar, bv. 5%), gepresenteerd als "partnertarief"
- Cadeaubonnen: GEEN marge (nominale waarde)
- Intern dashboard toont per order: inkoopprijs, verkoopprijs, marge, BTW

### 2.2 Betaling — altijd online, nooit "op aanvraag"
- Geen betaling = geen boeking. Punt.
- Betaalmethoden: iDEAL, creditcard (Visa/MC/Amex), Apple Pay, Google Pay, PayPal
- Groepen €500+: ook SEPA-overboeking ná WeFact-factuur (boeking pas definitief na ontvangst)
- B2B-partners (goedgekeurd account): op rekening via WeFact, betaaltermijn 14 dagen
- PSP: Mollie (NL-first, ondersteunt alles bovenstaand)

### 2.3 WeFact-integratie
- Checkbox bij checkout: "📄 Factuur ontvangen via WeFact" → velden bedrijfsnaam, BTW-nummer, projectcode
- Verplicht aangevinkt bij: zakelijke producten (kerstpakketten), B2B-partners, groepen 10+
- Na betaling: automatische factuur via WeFact API (api.wefact.nl) met:
  - BTW correct gesplitst: 9% (entertainment, food, hotels) / 21% (diensten, workshops)
  - Debiteur aanmaken/matchen op BTW-nummer
  - Nettofacturen voor touroperators (partnertarief)
  - Cadeaubonnen als apart factuurproduct (BTW-vrij bij verkoop, BTW bij inwisseling)
- Export naar Exact/Twinfield/Snelstart via WeFact

### 2.4 Boekbaar vs. Tip
- `bookable: true` → volledige boekingsflow met betaling
- `bookable: false` → "💡 TIP"-kaart: korte uitleg, openingstijden, externe link/kaart. GEEN boekknop, geen prijs-claim. Voorbeelden: Domkerk (binnenlopen), Theehuis Rhijnauwen, De Kromme Haring, vandeStreek Taproom
- Beheerpaneel: eigenaar kan status per leverancier wisselen

### 2.5 Vouchers & wijzigingen
- Klant betaalt bij ONS. Wij bevestigen bij leverancier (API of mail-queue)
- Klant ontvangt per e-mail: ① bevestigingsoverzicht ② per activiteit een aparte voucher (unieke code, QR, PDF) ③ optioneel WeFact-factuur
- Wijzigen (tijdstip/aantal) mogelijk via klantportaal "Mijn boeking" (magic link in mail), ZOLANG het wijzigingsbeleid van het boekingssysteem het toelaat:

| Systeem | Deadline | Tijd wijzigen | Aantal wijzigen |
|---|---|---|---|
| Ticketmaster | 48u | ✅ | ❌ |
| Viator | 24u | ✅ | ✅ |
| GetYourGuide | 24u | ✅ | ✅ |
| FareHarbor | 24u | ✅ | ✅ |
| Booking.com | 24u | ❌ (alleen datum) | ❌ |
| TheFork | 24u | ✅ | ✅ |
| Direct API | 48u | ✅ | ✅ |

- Bij wijziging: oude voucher vervalt, nieuwe voucher (nieuwe code) automatisch gemaild, leverancier geüpdatet, meerprijs/restitutie automatisch verrekend via Mollie
- Annuleren: zelfde deadlines; restitutie naar oorspronkelijke betaalmethode

---

## 3. BOEKINGSINTEGRATIES (8 kanalen)

| Kanaal | API | Gebruik |
|---|---|---|
| Ticketmaster | Discovery API | Domtoren, Spoorwegmuseum, TivoliVredenburg, Beatrix Theater, alle podia |
| Viator | Partner API | Kasteel de Haar, Speelklok, Canal Cruises, Utours, Free Walking Tour, Food Tour |
| GetYourGuide | Partner API | DOMunder, Schuttevaer |
| FareHarbor | External API | **DagjeSuppen.nl** (LET OP: What'SUP bestaat niet meer!) |
| Booking.com | Demand API | Alle 18 hotels, enkele restaurants |
| TheFork | Restaurant API | Fine dining reserveringen |
| Mollie | Payments API | Alle betalingen |
| WeFact | API v2 | Facturatie |
| Direct/partner | Eigen webhook/mail-queue | ~53 lokale leveranciers (escape rooms, workshops, boules-bars, SUP, etc.) |

Voor "Direct API"-leveranciers zonder echte API: mail-queue met bevestigingsworkflow in beheerpaneel (eigenaar bevestigt binnen SLA, klant ziet "bevestiging volgt binnen 2 uur" — betaling is al binnen).

---

## 4. LEVERANCIERSDATABASE (±100 stuks — seed data)

### Musea & Attracties (10)
Domtoren (Ticketmaster, €14), DOMunder (GYG, €12,50), Museum Speelklok (Viator, €16), Centraal Museum (Direct, €15), Kasteel de Haar (Viator, €18), Spoorwegmuseum (Ticketmaster, €20), Rietveld Schröderhuis (Direct, €18), Miffy Museum (Direct, €10), Domkerk (TIP, gratis), Wax Figures Museum (TIP)

### Indoor / winter (16) — belangrijk voor groepen!
The Ping Pong Club (Direct, €10, groepen t/m 80), JEU de Boules Bar (Direct, €12, t/m 60), The Boules Club Oudegracht (Direct, €28 arrangement m. diner), The Grand Shuffle (Direct, €22), Mooie Boules (Direct, €15, t/m 100, karaoke+games), **Doloris Anoma Maze** (Direct, €16 — het kunst-doolhof), The Queen Escape Room (€20, ★4.9), Live Escape (€19), Mysterium (€20), Prison Escape (€45, acteurs), Escape World (€20), The Team Building (€25, karting+axe), Boulderhal Energiehaven/Zuidhaven/Sterk Spoor (€12), Climbing Wall Utrecht (€14)

### Workshop-reeksen (4) + losse workshops (10)
Keramiek 4 lessen (€130), Schilderen 6 lessen (€175, GrachtenAtelier), Bierbrouwen 3 sessies (€185, De Brakkerij), Aziatisch koken 4 lessen (€240, Chopsticks). Los: GrachtenAtelier schilderen €35 / chocolade €28, House of Clay €38, Clay to Plate €40, Keramiek Kafee €30, Chopsticks €65, Trai Vegan €55, Kookfabriek €70, Beer Pioneer €75, Brakkerij los €65

### Water (13)
DagjeSuppen.nl (FareHarbor, €22), Kayak Utrecht (€17, ★4.9), SUP- en Kanoverhuur (€15), Suppen Kromme Rijn (€22), SUP SUP CLUB (€20), Schuttevaer (GYG, €13), Utrecht Canal Cruises (Viator, €22), Domstadboot BBQ (€35), De Kleine Kapitein (€28, ★5.0), Grachtenvaarders (€40), Varen in Utrecht (Viator, €14), Canal Cruising (€25), Stromma Peddelboot (€9)

### Tours (7)
Free Walking Tour (Viator, tip-based), Local Tour Utrecht (€15), Utours (Viator, €25), Color Bike (€22), Craft Beer Tours (€35), William Street Bike verhuur (€10), Utrecht Food Tour (Viator, €40)

### Hotels (18) — NachtjeUtrecht.nl kern
Boutique: The Nox (€95), Brass (€89), Hotel Beijers (€85), Petit Beijers (€79), Anne&Max (€99), Cozy Pillow (€69), Court Hotel (€75). Luxury: Inntel (€130, spa), Crowne Plaza (€150), NH (€110), Van der Valk (€120, rooftop pool), Carlton President (€95, spa), Hampton by Hilton (€105). Overig: Mitland (€85, hond OK), Stayokay (€35, Miffy-kamer), Bunk (€29, kerk), Strowis (€25), City Center Lodge (€55). Alles via Booking.com Demand API.

### Restaurants (24)
Fine dining: Hemel & Aarde, Maeve, Water Tower WT, De Goedheyd, El Qatarijne, Pand 33, Kasteel Heemstede (Michelin), San Siro. Internationaal: Silk Road, Carmel Market. Casual: Ruby Rose, Biercafé Olivier (kerk!), Broadway Steakhouse, Beers & Barrels, Kartoffel, Streetfood Club, Graaf Floris, Orloff, Humphrey's. TIPS (niet boekbaar): Theehuis Rhijnauwen, Landhuis in de Stad, Buiten bij de Sluis, De Kromme Haring, vandeStreek Taproom. Reservering via TheFork/Booking.com/Direct.

### Events (8)
TivoliVredenburg, Beatrix Theater, Stadsschouwburg, De Helling, EKKO, Louis Hartlooper (film), Spring Festival, Leidsche Rijn Theater — allemaal Ticketmaster behalve Hartlooper (Direct).

### Wellness (7)
City Spa (€45), Thermen Maarssen (€43), Hammam Pretoria (€32), Thermen Soesterberg (€48), Amara privé-spa (€79), Inntel Wellness (€35 via Booking), Hammam Yasmine (TIP).

---

## 5. WEBSHOP (op UtrechtNow.nl, ~25 producten)

Categorieën: 🐰 Nijntje (knuffel €17,50, Dom-shirt €22, ontbijtset €24,50) · 🗼 Souvenirs (Domtoren-model €29, sneeuwbol, posters, Monopoly Utrecht €39,50, puzzel, boek) · ⚽ FC Utrecht (thuisshirt €79,95, sjaal €17,95, stadiontour-voucher €14,50, rompertje, bal — dropship via Fanshop Galgenwaard) · 🧀 Streekproducten (bierpakket €21,50 via Buurtbier.nl, borrelpakket €34,50 via SchotB. 1885, **zakelijke kerstpakketten €42,50 min. 10 st. WeFact verplicht**, chocolade-Dom, theedoos, stroopwafels, boerderijbox De Haarse Gaard) · 🎟️ Cadeaubonnen (€25/€50/€100 zonder marge, Belevenisbox Duo €89)

Fulfilment-types: `dropship` (partner verstuurt), `stock` (eigen voorraad), `digital` (direct per mail), `voucher`. Verzending: PostNL €4,95 / express €9,95 / afhalen Domplein gratis / gratis vanaf €50. Partners: Groeten uit Utrecht (★4.9), FC Utrecht Fanshop, SchotB. 1885, Buurtbier.nl, Little Beershop, It's a present!, Official Souvenir Store, GrachtenAtelier, De Haarse Gaard.

---

## 6. UTRECHTINCOMING.NL — B2B PORTAL (uit eerder ontwerp)

- Duits primair, daarna EN/NL/FR (van de 7 talen)
- Reisorganisaties registreren met bedrijfsgegevens → **handmatige goedkeuring door eigenaar** vóór toegang
- Na login: eigen dashboard met partnertarieven (nettoprijzen), beschikbaarheid, groepsaanvragen ÉN direct boeken
- Eigenaar keurt elke boeking goed (instelbaar: kleine boekingen automatisch, grote handmatig)
- Arrangement-builder: hotel + activiteiten + restaurant + gids + touringcar-parkeerinfo samenstellen per groep
- Vouchers per onderdeel downloadbaar als PDF (Duits/Engels), met groepsnaam en reisleider
- Berichtensysteem tussen partner en eigenaar
- Facturatie: verzamelfactuur per maand via WeFact mogelijk
- White-label optie: partner kan vouchers met eigen logo genereren (premium-tier)

---

## 7. FEATURES ("alle toeters en bellen")

1. **AI-dagplanner** (Claude API): vrije tekstinvoer + filterchips → persoonlijk dagprogramma met echte leveranciers, direct boekbaar. In alle 7 talen.
2. **AI-chatbot** (Claude API): rechtsonder, kennis van volledige database, beantwoordt in taal van gebruiker, kan boekingsflow starten. Escalatie naar mail/telefoon.
3. **AI-telefoniste**: telefoonnummer (bv. via Twilio + Claude): 24/7 reserveringen aannemen, beschikbaarheid checken, doorverbinden bij complexe groepsvragen. Gesprekslog in beheerpaneel.
4. **Klantportaal "Mijn boeking"**: magic-link login, vouchers herdownloaden, wijzigen/annuleren binnen beleid, factuur downloaden.
5. **Beheerpaneel (NL)**: leveranciers CRUD (incl. bookable-toggle, marge-override, wijzigingsbeleid), orders, wijzigingsverzoeken, mail-queue voor Direct-leveranciers, B2B-goedkeuringen, omzet/marge-dashboard, voorraadbeheer webshop, blogeditor, FAQ-editor.
6. **Blog/CMS**: SEO-artikelen per taal ("De 10 beste dagjes Utrecht 2026", "Utrecht met kinderen", "Groepsuitje plannen", "SUP in Utrecht", "Touroperator gids"). Markdown-based, per domein eigen blog.
7. **FAQ**: accordeon, per domein en taal, schema.org FAQPage markup.
8. **SEO**: SSR/SSG (Next.js), meta per pagina/taal, hreflang, sitemap.xml per domein, schema.org (LocalBusiness, Product, Event, TouristAttraction, Hotel), Core Web Vitals optimaal, OG-images per route.
9. **E-mail** (Resend/Postmark): bevestiging, vouchers (PDF-bijlage + inline), wijzigingsbevestiging, herinnering 24u vooraf met weer + looproute, review-verzoek achteraf.
10. **Reviews**: na afloop verzoek; intern reviewsysteem + link Google Reviews.
11. **Cadeaubon-engine**: codes genereren, saldo bijhouden, inwisselbaar bij checkout (alle domeinen).
12. **Analytics**: Plausible/GA4, conversie-tracking per domein en kanaal, marge-rapportage.
13. **Dag-app/itinerary-pagina**: na boeking één mobiele pagina met tijdlijn, looproutes (Google Maps embed), openingstijden, alle vouchers.

---

## 8. TECH STACK

- **Monorepo**: Turborepo. Apps: `web-utrechtnow`, `web-dagje`, `web-nachtje`, `web-incoming`, `admin`. Packages: `ui`, `db`, `booking-engine`, `i18n`, `integrations`
- **Frontend**: Next.js 14+ (App Router), Tailwind, shadcn/ui
- **Backend**: Next.js API routes + achtergrondjobs via Inngest/Trigger.dev (vouchers, mails, leverancier-sync)
- **DB**: PostgreSQL (Supabase) — schema's: providers, products, orders, order_items, vouchers, customers, partners(B2B), invoices, modifications, giftcards, content(blog/faq), audit_log
- **Auth**: Supabase Auth (klant magic-link, B2B e-mail+ww+goedkeuring, admin 2FA)
- **Betalingen**: Mollie. **Facturen**: WeFact API. **PDF**: react-pdf of Puppeteer. **Mail**: Resend. **i18n**: next-intl, 7 locales
- **Hosting**: Vercel (4 domeinen → 1 project met domain-routing of 4 apps), Supabase EU-regio (GDPR)

### Design
- UtrechtNow/Dagje/Nachtje: huisstijl "canal & dom" — donkerblauw `#1E3A4A`, terracotta `#C8753A`, crème `#F7F3EC`, Playfair Display (headings) + Inter
- UtrechtIncoming: zakelijker — navy `#1a2e4a` + oranje `#e85d26` (bestaand ontwerp)
- Volledig responsive, WCAG AA

---

## 9. FASERING

**Fase 1 (MVP, 4-6 wk):** UtrechtNow.nl NL+EN+DE, 30 kernleveranciers, boekingsflow + Mollie + vouchers + wijzigen, WeFact, beheerpaneel basis, chatbot.
**Fase 2 (4 wk):** Webshop, DagjeUtrecht + NachtjeUtrecht (route/hotel-funnels), alle 7 talen, blog/FAQ/SEO, klantportaal volledig.
**Fase 3 (4 wk):** UtrechtIncoming B2B-portal compleet, AI-telefoniste, alle ~100 leveranciers + echte API-koppelingen (Viator/GYG/Ticketmaster/FareHarbor/Booking/TheFork), cadeaubon-engine, reviews, dag-app.

---

## 10. WAT NIET MAG

- Nooit "op aanvraag" als boekoptie tonen
- Nooit marge/servicekosten benoemen richting klant
- Geen boekknop bij `bookable:false` leveranciers
- What'SUP Utrecht NIET opnemen (bestaat niet meer — DagjeSuppen.nl is de vervanger)
- Geen boeking definitief zonder geslaagde betaling (behalve goedgekeurde B2B op rekening)
