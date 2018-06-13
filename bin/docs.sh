#!/bin/bash

set -e

rm -rf ./doc/*;
mkdir -p ./doc/{frontend,backend,database};

# Documentation for the frontend
echo "Writing documentation for the frontend";
npm install --silent && npm run docs;

# Documentation for the backend
echo "Writing documentation for the backend";
cd ./api;
for pkg in $(go list ./... | cut -c 2-)
do
    IFS='/' read -r -a array <<< "$pkg"
    pkgname=$(echo $pkg | cut -c 17-)
    if [ "$pkgname" == "api" ]
    then
        godoc -html -ex $pkg > "../doc/backend/index.html";
    else
        mkdir -p "../doc/backend/$pkgname";
        godoc -html -ex $pkg > "../doc/backend/$pkgname/index.html";
    fi
done
cd ..;

# Documentation for the database
echo "Writing documentation for the database";
pg_dump -h db -p 5432 -d postgres -U postgres -s > ./doc/database/schema.sql;
sed -i 's/jsonb/text\[\]/' ./doc/database/schema.sql;
# Use this is you want a simple diagram but a bit messy
# sqlt-diagram -d PostgreSQL -t "eApp Database" --gutter -i "png" -o "./doc/database/database.png" ./doc/database/schema.sql;
# Use this if you want a pretty diagram
sqlt-graph -d PostgreSQL -l 'dot' -c --cluster --show-constraints -t 'svg' -o "./doc/database/database.svg" ./doc/database/schema.sql;
# rm ./doc/database/schema.sql;
