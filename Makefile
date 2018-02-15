MAKEFLAGS += --silent

all: clean setup test build

#
# Cleaning
#
clean: stop clean-react clean-go
clean-react: clean-front
clean-front:
	rm -rf ./dist/*
	rm -rf ./coverage/*
	rm -rf ./jest/*
clean-go: clean-back
clean-back:
	rm -rf ./api/api

#
# Setup
#
setup: setup-certificates setup-docker
setup-certificates:
	./bin/gen-test-certificates.sh
setup-docker: setup-docker-react setup-docker-go
setup-docker-react:
	docker-compose build frontend
setup-docker-go:
	docker-compose build web db api

#
# Testing
#
test: test-react test-go
test-react: test-front
test-front:
	docker-compose run --rm frontend ./bin/test
test-go: test-back
test-back:
	docker-compose run --rm api make test

#
# Building
#
build: build-react build-go
build-react: build-front
build-front:
	docker-compose run --rm frontend ./bin/build
build-go: build-back
build-back:
	docker-compose run --rm api make build

#
# Packaging
#
package: package-static package-image
package-clean:
	docker rmi -f eapp_golang:smallest
package-static:
	docker run --rm \
               -v ~/src/github.com/18F/e-QIP-prototype:/go/src/github.com/18F/e-QIP-prototype \
               -w /go/src/github.com/18F/e-QIP-prototype/api \
               -e "CGO_ENABLED=0" \
               golang:latest go build -ldflags '-w -extldflags "-static"' -o api
package-image:
	docker build -f Dockerfile.eapp_golang . -t eapp_golang:smallest

#
# Suites
#
react: clean-react setup-docker-react test-react build-react
go: clean-go setup-docker-go test-go build-go

#
# Operations
#
down:
	docker-compose down
start:
	docker-compose start web api db
stop:
	docker-compose stop
run:
	docker-compose up web api db
docs:
	docker-compose up docs
