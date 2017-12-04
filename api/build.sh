#! /bin/sh

../bin/compile-xmlsec1.sh
glide install
go build -o api
