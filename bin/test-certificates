#!/bin/sh

SUBJ="/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com"
WS_KEY=./api/webservice/testdata/test.key
WS_PKCS=./api/webservice/testdata/test.pkcs.key
WS_CER=./api/webservice/testdata/test.cer

rm -f "$WS_KEY"
rm -f "$WS_PKCS"
rm -f "$WS_CER"

openssl genrsa -out "$WS_KEY" 2048
openssl pkcs8 -topk8 -inform PEM -in "$WS_KEY" -outform DER -nocrypt -out "$WS_PKCS"
openssl req -new -x509 -subj "$SUBJ" -days 365 -key "$WS_KEY" -out "$WS_CER" -sha256

# User=rw Group=r Other=r
chmod 0600 "$WS_KEY"
chmod 0640 "$WS_PKCS"
chmod 0640 "$WS_CER"

SAML_KEY=./api/eapp.key
SAML_CER=./api/eapp.crt

rm -f "$SAML_KEY"
rm -f "$SAML_CER"

openssl genrsa -out "$SAML_KEY" 2048
openssl req -new -x509 -subj "$SUBJ" -days 365 -key "$SAML_KEY" -out "$SAML_CER" -sha256

# User=rw Group=r Other=r
chmod 0644 "$SAML_KEY"
chmod 0644 "$SAML_CER"
