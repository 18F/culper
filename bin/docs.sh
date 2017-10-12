#!/bin/bash

mkdir -p ./doc;
rm ./doc/*;

# Documentation for the frontend
echo "Writing documentation for the frontend";
npm install && npm run docs;

# Documentation for the backend
echo "Writing documentation for the backend";
cd ./api;
go list ./... | cut -c 2- | xargs -I % godoc -html -ex % > ../doc/api.html;
cd ..;

# Documentation for the database
echo "Writing documentation for the database";
pg_dump -h db -p 5432 -d postgres -U postgres -s > ./doc/schema.sql;
sqlt-diagram -d PostgreSQL -t "eApp Database" -i "png" -o "./doc/database.png" ./doc/schema.sql;
rm ./doc/schema.sql;
