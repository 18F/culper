#! /bin/sh

../bin/compile-xmlsec1.sh
glide install
chown -R 1000:1000 ./.glide
chown -R 1000:1000 ./vendor
go build -o api
chown 1000:1000 ./api
