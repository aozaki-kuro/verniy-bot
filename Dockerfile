# Building

FROM oven/bun:alpine AS base

WORKDIR /app/

COPY . /app/

RUN bun install
RUN bun run build

# Deploy

FROM oven/bun:alpine AS production

ENV NODE_ENV=production

WORKDIR /app/

COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json .
COPY --from=base /app/bun.lockb .

RUN bun install --frozen-lockfile

RUN bun run deploy-commands

CMD ["bun", "start"]
