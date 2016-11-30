set -e

API="https://api.fr.cloud.gov"
ORG="gsa-acq-eqip"
SPACE=$1


if [ $# -ne 1 ]; then
  echo "Usage: deploy <space>"
  exit
fi

cf login --a $API --u $CF_USERNAME --p $CF_PASSWORD --o $ORG -s $SPACE

if [ $SPACE = 'production' ]; then
  API_NAME="eqip-prototype-api"
  API_MANIFEST="manifest-api.yml"

  FRONTEND_NAME="eqip-prototype"
  FRONTEND_MANIFEST="manifest-frontend.yml"

  cf zero-downtime-push $API_NAME -f $API_MANIFEST
  cf zero-downtime-push $FRONTEND_NAME -f $FRONTEND_MANIFEST
elif [ $SPACE = 'staging' ]; then
  API_NAME="eqip-prototype-api-staging"
  API_MANIFEST="manifest-api-staging.yml"

  FRONTEND_NAME="eqip-prototype-staging"
  FRONTEND_MANIFEST="manifest-frontend-staging.yml"

  cf zero-downtime-push $API_NAME -f $API_MANIFEST
  cf zero-downtime-push $FRONTEND_NAME -f $FRONTEND_MANIFEST
else
  echo "Unknown space: $SPACE"
  exit
fi
