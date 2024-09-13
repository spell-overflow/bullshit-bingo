FROM node:20.17.0 as dependencies

ARG FONTAWESOME_PACKAGE_TOKEN

WORKDIR /app
COPY package.json yarn.lock .npmrc /app/
RUN FONTAWESOME_PACKAGE_TOKEN=${FONTAWESOME_PACKAGE_TOKEN} yarn install --frozen-lockfile

FROM dependencies as build

ENV DATABASE_URL="file:./db/db.sqlite"

ENV NEXTAUTH_SECRET="_"
ENV NEXTAUTH_URL="http://localhost:3000"

ENV GITHUB_CLIENT_ID="_"
ENV GITHUB_CLIENT_SECRET="_"

ENV GOOGLE_CLIENT_ID="_"
ENV GOOGLE_CLIENT_SECRET="_"

COPY . /app/
RUN mkdir ./db
RUN yarn build

FROM build as bingo

ENTRYPOINT ["yarn", "start"]
VOLUME [ "/app/db" ]
EXPOSE 3000
