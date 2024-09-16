FROM node:20.17.0 as dependencies

ARG FONTAWESOME_PACKAGE_TOKEN=${FONTAWESOME_PACKAGE_TOKEN}
ENV FONTAWESOME_PACKAGE_TOKEN=${FONTAWESOME_PACKAGE_TOKEN}

WORKDIR /app
COPY package.json yarn.lock .npmrc /app/
RUN yarn install --frozen-lockfile

FROM dependencies as build

ENV DATABASE_URL="file:./db/db.sqlite"

ENV AUTH_SECRET="_"
ENV AUTH_URL="http://localhost:3000"

ENV KEYCLOAK_CLIENT_ID="_"
ENV KEYCLOAK_CLIENT_SECRET="_"
ENV KEYCLOAK_ISSUER="_"

COPY . /app/
RUN mkdir ./db
RUN yarn build

FROM build as bingo

ENTRYPOINT ["yarn", "start"]
VOLUME [ "/app/db" ]
EXPOSE 3000
