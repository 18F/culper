#!/bin/bash
cp /srv/*.{conf,crt,key} /var/lib/postgresql/data
chown -R postgres: /var/lib/postgresql/data
chmod 0600 /var/lib/postgresql/data/server.key
chmod 0640 /var/lib/postgresql/data/server.crt
