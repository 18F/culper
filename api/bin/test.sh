#!/bin/bash

# Build the application
./build.sh

# Run the tests
GOLANG_ENV=test go test $(go list ./... | grep -v /vendor/)
