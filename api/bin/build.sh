#!/bin/sh

../bin/compile-xmlsec1.sh
glide update
chown -f -R 1000:1000 ./.glide
chown -f -R 1000:1000 ./vendor
go build -o api
chown -f 1000:1000 ./api
