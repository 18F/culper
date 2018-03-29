#!/bin/sh

../bin/compile-xmlsec1.sh
go build -o api
chown -f 1000:1000 ./api
