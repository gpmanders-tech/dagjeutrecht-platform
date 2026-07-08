# Dockerfile voor DagjeUtrecht.nl (Next.js monorepo, pnpm workspace)
# Bouwt alleen de web-dagje app; hergebruikt @utrecht/db, ui, i18n, booking-engine packages.

FROM node:20-slim AS base
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/booking-engine/package.json ./packages/booking-engine/
COPY packages/integrations/package.json ./packages/integrations/
COPY apps/web-dagje/package.json ./apps/web-dagje/
RUN pnpm install --frozen-lockfile

# ---------- builder ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps ./apps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY packages ./packages
COPY apps/web-dagje ./apps/web-dagje

# Prisma client genereren (heeft geen DB nodig, alleen schema)
RUN cd packages/db && pnpm exec prisma generate

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter web-dagje build

# ---------- runner ----------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001

# Alleen de output kopiëren
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/web-dagje ./apps/web-dagje
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json ./

EXPOSE 3001
CMD ["pnpm", "--filter", "web-dagje", "start"]
