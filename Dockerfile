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

RUN apk add curl
RUN curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr sh

COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json .
COPY --from=base /app/bun.lockb .

RUN bun install --frozen-lockfile

RUN bun run deploy-commands

CMD ["bun", "start"]
