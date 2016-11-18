#! /bin/sh

echo "--------------------------------------"
echo "Does this file get run in travis?"
echo "--------------------------------------"

go get -u -v github.com/kardianos/govendor
/go/bin/govendor sync

go build -o api
./api 2>&1
