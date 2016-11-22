#! /bin/sh

./docker-build.sh
go test $(go list ./... | grep -v /vendor/)
