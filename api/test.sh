#! /bin/bash

# Get `goose` to run the database migrations
go get bitbucket.org/liamstask/goose/cmd/goose
cd ..

# Make sure migrator can read the database URI
# We need to unset this for testing purposes
export DATABASE_URI=postgres://$DATABASE_USER@$DATABASE_HOST/$DATABASE_NAME?sslmode=disable
goose -env test dbversion
goose -env test status
goose -env test up
unset DATABASE_URI

# Now build and test the source code
cd ./api/
./build.sh
go test $(go list ./... | grep -v /vendor/)
