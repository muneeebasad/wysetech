# ── Stage 1: install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# ── Stage 2: build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG ADMIN_PASSWORD=changeme
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD

RUN npm run build

# ── Stage 3: production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# su-exec: lets the entrypoint start as root (to fix volume permissions)
# then drop to the nextjs user before running the server
RUN apk add --no-cache su-exec

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone server + compiled assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

# sharp native bindings required by next/image in standalone mode
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp  ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img   ./node_modules/@img

# Seed content — will be overridden by the bind-mount volume in production
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

RUN mkdir -p ./public/team && chown nextjs:nodejs ./public/team

# Entrypoint fixes bind-mount ownership then drops to nextjs user
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
