FROM node:18-alpine AS development

WORKDIR /usr/src/techchallenge-app/items-microservice

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

COPY prisma ./prisma

RUN yarn run build


FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/techchallenge-app/items-microservice

COPY package*.json ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/techchallenge-app/items-microservice/dist ./dist
RUN npx prisma generate
CMD [ "yarn", "run", "start:prod" ]