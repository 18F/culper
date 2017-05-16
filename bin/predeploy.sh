#! /bin/bash

set -e

SPACE=$1

#
# Determine what environment to configure based on the
# originating repository.
#
# Reference: https://docs.travis-ci.com/user/environment-variables
#
# if [ "$TRAVIS_REPO_SLUG" = "18F/e-QIP-prototype" ]; then
#   ENV_FILE=".env.production"
# elif [ "$TRAVIS_REPO_SLUG" = "truetandem/e-QIP-prototype" ]; then
#   ENV_FILE=".env.staging"
# else
#   ENV_FILE=".env.test"
# fi

if [ "$SPACE" = "production" ]; then
  ENV_FILE=".env.production"
elif [ "$SPACE" = "staging" ]; then
  ENV_FILE=".env.staging"
elif [ "$SPACE" = "dev" ]; then
  ENV_FILE=".env.dev"
else
  ENV_FILE=".env.test"
fi

#
# Copy the appropriate environment configuration to `.env` so
# docker-compose can use it.
#
# It is forced (-f) to ensure any previous copy of the `.env`
# file is clobbered.
#
cp -f $ENV_FILE .env

#
# Re-initialize the containers and build with the new environment
# variables.
#
# docker-compose build
docker-compose run frontend npm install --silent
docker-compose run frontend npm run build --silent
