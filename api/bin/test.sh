#!/bin/bash

# Build the application
./bin/build.sh

# Run the tests
GOLANG_ENV=test go test $(go list ./... | grep -v /vendor/)
