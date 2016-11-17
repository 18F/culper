#! /bin/sh

echo "--------------------------------------"
echo "Does this file get run in travis?"
echo "--------------------------------------"

go get -u github.com/kardianos/govendor
govendor sync

go build -o api
./api 2>&1
