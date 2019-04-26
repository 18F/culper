#!/bin/bash

set -eo pipefail

go build github.com/18F/e-QIP-prototype/api/cmd/dbmigrate
go build github.com/18F/e-QIP-prototype/api/cmd/dbreset

./dbmigrate || true

./dbreset -force dbtest_test

./dbmigrate -migrations_path ./api/migrations dbtest_test
