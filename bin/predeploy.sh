#!/bin/bash

set -e

SPACE=$1

#
# Determine what environment to configure based on the repo/branch
#
if [ "$SPACE" = "cloudgov" ]; then
		if [ "$CIRCLE_BRANCH" = "master" ]; then
			ENV_FILE=".env.production"
		elif [ "$CIRCLE_BRANCH" = "develop" ]; then
			ENV_FILE=".env.dev"
		fi
fi

#
# If no environment file was specified assume test.
#
if [ "$ENV_FILE" == "" ]; then
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
# Add CI/CD variables to the environment file.
#
if [ "$CODECOV_TOKEN" != "" ]; then
		echo CODECOV_TOKEN=$CODECOV_TOKEN >> .env
fi

#
# Set all variables in the file to the machine.
#
set -a
. .env
set +a
