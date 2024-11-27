FROM node:18-alpine AS development

WORKDIR /usr/src/techchallenge-app/items-microservice

COPY package*.json ./

RUN yarn install --ignore-scripts

COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json .
COPY prisma ./prisma
COPY test ./test

RUN npx prisma generate && yarn run build


FROM node:18-alpine AS production

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/techchallenge-app/items-microservice

COPY package*.json ./

RUN yarn install --production --ignore-scripts

COPY --from=development /usr/src/techchallenge-app/items-microservice/dist ./dist

USER nonroot

CMD [ "yarn", "run", "start:prod" ]