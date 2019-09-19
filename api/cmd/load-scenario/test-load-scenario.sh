#!/bin/bash

set -e

echo "an attempt was made"

go build -o ./api/bin/load-scenario ./api/cmd/load-scenario

sleep 2

./api/bin/load-scenario -url https://api.eapp.local.test:3000 -U test03 -useSessionToken ./api/testdata/complete-scenarios/test1.json || true

./api/bin/load-scenario -url https://api.eapp.local.test:3000 -U test03 ./api/testdata/complete-scenarios/test1.json

./api/bin/load-scenario -url https://api.eapp.local.test:3000 -U admin ./api/testdata/complete-scenarios/test1.json