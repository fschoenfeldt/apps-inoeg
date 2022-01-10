# This dockerfile builds three distinct nextjs-apps as static html into one combined nginx-image

## builder
FROM node:16-alpine AS builder

WORKDIR /build

COPY . .

ENV NEXTJS_IGNORE_ESLINT 1
ENV NEXTJS_IGNORE_TYPECHECK 1
ENV NEXT_TELEMETRY_DISABLED 1

ENV NEXT_PROVIDER_BASEPATH "/provider"
ENV NEXT_MEDIATOR_BASEPATH "/mediator"

ENV NODE_ENV "production"

RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile --prefer-offline 
RUN pnpm i18n:build --recursive --if-present 
RUN pnpm build

## prod
FROM nginxinc/nginx-unprivileged:stable-alpine

WORKDIR /app

COPY --from=builder build/apps/user/dist .
COPY --from=builder build/apps/provider/dist provider
COPY --from=builder build/apps/mediator/dist mediator
COPY --from=builder build/.docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

USER nginx
EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1