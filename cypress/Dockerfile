FROM cypress/base:10

RUN apt update && apt upgrade -y && apt install -y postgresql-client
COPY package.json yarn.lock /app/
WORKDIR /app
RUN yarn install && yarn run cypress install
COPY . /app
