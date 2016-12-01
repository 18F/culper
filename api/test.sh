#! /bin/sh

./build.sh
go test $(go list ./... | grep -v /vendor/)
