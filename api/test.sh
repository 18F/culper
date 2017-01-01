#! /bin/bash

./build.sh
go test $(go list ./... | grep -v /vendor/)
