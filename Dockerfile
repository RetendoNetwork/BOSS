# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /home/node/app

FROM base AS dependencies

RUN --mount=type=bind,source=package.json,target=package.json \
	--mount=type=bind,source=package-lock.json,target=package-lock.json \
	--mount=type=cache,target=/root/.npm \
	npm ci --omit=dev

FROM base AS build

RUN --mount=type=bind,source=package.json,target=package.json \
	--mount=type=bind,source=package-lock.json,target=package-lock.json \
	--mount=type=cache,target=/root/.npm \
	npm ci

COPY . .
RUN npm run build

FROM base AS final

RUN mkdir -p /home/node/app/logs && chown node:node /home/node/app/logs

USER node

COPY package.json .

COPY --from=dependencies /home/node/app/node_modules /home/node/app/node_modules
COPY --from=build /home/node/app/dist /home/node/app/dist

CMD ["node", "."]
