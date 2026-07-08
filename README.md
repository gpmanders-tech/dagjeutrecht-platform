# Utrecht Platform

Monorepo voor 4 domeinen op 1 backend:

| App | Domein | Doel |
|---|---|---|
| `apps/web-utrechtnow` | utrechtnow.nl | B2C hoofdplatform |
| `apps/web-dagje` | dagjeutrecht.nl | Dagroute-funnels |
| `apps/web-nachtje` | nachtjeutrecht.nl | Hotel-arrangementen |
| `apps/web-incoming` | utrechtincoming.nl | B2B touroperators (Duits primair) |
| `apps/admin` | admin.utrechtnow.nl | Beheerpaneel (NL) |

## Packages

- `@utrecht/db` — Prisma schema + client
- `@utrecht/ui` — gedeelde React-componenten + Tailwind tokens
- `@utrecht/i18n` — next-intl config + 7 talen
- `@utrecht/booking-engine` — types + adapter-interface + marge/voucher-logic
- `@utrecht/integrations` — adapters voor Ticketmaster/Viator/GYG/FareHarbor/Booking/TheFork/Mollie/WeFact/Resend
- `@utrecht/config` — gedeelde TS/Tailwind/eslint config

## Aan de slag

```bash
pnpm install
cp .env.example .env
# vul .env (DATABASE_URL, Mollie/WeFact/Resend keys)
pnpm db:generate
pnpm db:push
pnpm db:seed       # ~100 leveranciers seed
pnpm dev           # alle apps tegelijk
```

Of één app: `pnpm --filter web-utrechtnow dev`

## Business-regels (zie MASTERPROMPT)

- Marge 10% B2C / 5% B2B — **nooit zichtbaar voor klant**
- Geen "op aanvraag" — altijd betalen of TIP-kaart (`bookable:false`)
- Vouchers per onderdeel, wijzigbaar binnen leverancier-deadline
- WeFact-factuur optioneel B2C, verplicht zakelijk/B2B/groepen 10+
