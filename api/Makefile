MAKEFLAGS += --silent

all: clean test build

test:
	GOLANG_ENV=test go test -cover $(shell go list ./... | grep -v /vendor/)

build:
	./bin/build.sh

clean:
	rm -f ./api
