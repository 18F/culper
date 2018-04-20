MAKEFLAGS += --silent

all: clean test build

test:
	GOLANG_ENV=test go test -cover $(shell go list ./... | grep -v /vendor/)

build:
	go build -o api ./cmd/server
	chown -f 1000:1000 ./api

clean:
	rm -f ./cmd/server/server
	rm -f ./cmd/flush/flush
	rm -f ./cmd/reset/reset
	rm -f ./cmd/unlock/unlock
