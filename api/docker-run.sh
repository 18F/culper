#! /bin/sh

go get -u github.com/kardianos/govendor
govendor sync

go build -o api
./api 2>&1
