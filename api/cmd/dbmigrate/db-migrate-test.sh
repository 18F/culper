#!/bin/bash

set -eo pipefail

go build github.com/18F/e-QIP-prototype/api/cmd/dbmigrate

./dbmigrate || true

./dbmigrate -reset -force dbtest_test

./dbmigrate dbtest_test

./dbmigrate -migrations_path ./api/migrations dbtest_test
