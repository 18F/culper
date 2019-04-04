#!/bin/bash

# Usage: find . | entr -c docker exec e-qip-prototype_api_1 ./cmd/sftype/test_sftype.sh

set -eo pipefail

go build github.com/18F/e-QIP-prototype/api/cmd/sftype

# Check that the wrong # of args returns non-zero
./sftype not enough && echo "FAIL: arg check"

# get original form type
original_type=$(./sftype test07 || echo "FAIL: Print Form Type")

# try an invalid form type
./sftype test07 SF85 2001-03 && echo "FAIL: invalid form type worked"

./sftype test07 SF85 2017-12_draft7 || echo "FAIL: exit non-zero"

expected_type="test07 SF85 2017-12_draft7"

set_type=$(./sftype test07)

[ "$expected_type" == "$set_type" ] || echo "FAIL: Didn't Set"

# set form type back
./sftype $original_type || echo "FAIL: exit non-zero"

echo "PASS"
