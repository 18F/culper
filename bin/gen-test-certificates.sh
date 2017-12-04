#!/bin/sh

SUBJ="/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com"
WS_KEY=./api/webservice/testdata/test.key
WS_PKCS=./api/webservice/testdata/test.pkcs.key
WS_CER=./api/webservice/testdata/test.cer

openssl genrsa -out "$WS_KEY" 2048
openssl pkcs8 -topk8 -inform PEM -in "$WS_KEY" -outform DER -nocrypt -out "$WS_PKCS"
openssl req -new -x509 -subj "$SUBJ" -days 365 -key "$WS_KEY" -out "$WS_CER" -sha256

SAML_KEY=./api/eapp.key
SAML_CER=./api/eapp.crt

openssl genrsa -out "$SAML_KEY" 2048
openssl req -new -x509 -subj "$SUBJ" -days 365 -key "$SAML_KEY" -out "$SAML_CER" -sha256
