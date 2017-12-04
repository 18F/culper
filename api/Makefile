MAKEFLAGS += --silent

all: clean test build

test:
	glide install
	GOLANG_ENV=test go test -cover $(shell go list ./... | grep -v /vendor/)

build:
	go build -o api

clean:
	rm -f ./api
