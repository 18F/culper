#! /bin/bash

cp .env.test .env

docker-compose build

./bin/predeploy.sh

./bin/deploy.sh staging
