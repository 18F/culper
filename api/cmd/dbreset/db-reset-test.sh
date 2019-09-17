#!/bin/bash

set -eo pipefail

go build github.com/18F/e-QIP-prototype/api/cmd/dbreset

./dbreset || true

./dbreset -force dbtest_test
