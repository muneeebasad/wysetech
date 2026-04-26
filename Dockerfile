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

# ADMIN_PASSWORD is required at build time only if middleware reads it during
# the build phase — pass it here so next build doesn't warn about missing env.
ARG ADMIN_PASSWORD=changeme
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD

RUN npm run build

# ── Stage 3: production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone server + static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

# Seed the content directory so the CMS has something to start with.
# Mount a volume over /app/content in production to persist CMS edits.
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

# Ensure the photo-upload directory exists and is writable
RUN mkdir -p ./public/team && chown nextjs:nodejs ./public/team

USER nextjs

EXPOSE 3000

# ADMIN_PASSWORD must be supplied at runtime via -e or docker-compose env.
CMD ["node", "server.js"]
