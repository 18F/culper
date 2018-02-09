#! /bin/bash

set -e

SPACE=$1

#
# Determine what environment to configure based on the repo/branch
#

# Use CircleCI's ENV variables
# TODO: Remove CIRCLE vars and use "staging" space if/when we're in one repo; else when Circle implements `owner` as a job filter.
if [ "$SPACE" = "production" ] && [ "$CIRCLE_PROJECT_USERNAME" = "18F" ]; then
  ENV_FILE=".env.production"
elif [ "$SPACE" = "production" ] && [ "$CIRCLE_PROJECT_USERNAME" = "truetandem" ]; then
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
docker-compose run frontend ./bin/build
