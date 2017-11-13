#! /bin/bash

./build.sh
GOLANG_ENV=test go test $(go list ./... | grep -v /vendor/)
