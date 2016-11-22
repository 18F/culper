#! /bin/sh

go get -u -v github.com/kardianos/govendor
/go/bin/govendor sync

go build -o api
go test $(go list ./... | grep -v /vendor/)
