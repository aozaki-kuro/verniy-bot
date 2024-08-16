# Building

FROM oven/bun:alpine AS base

WORKDIR /app/

COPY . /app/

RUN bun install --frozen-lockfile
RUN bun run build

# Deploy

FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app/

RUN curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr bash

COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json .
COPY --from=base /app/package-lock.json .

RUN bun install --frozen-lockfile

RUN bun run deploy-commands

CMD ["bun", "start"]
