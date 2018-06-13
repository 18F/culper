#! /bin/sh

set -e

make build
./api 2>&1
