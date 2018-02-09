MAKEFLAGS += --silent

all: clean setup test build

#
# Cleaning
#
clean: stop clean-front clean-back
clean-front:
	rm -rf ./dist/*
	rm -rf ./coverage/*
	rm -rf ./jest/*
clean-back:
	rm -rf ./api/api

#
# Setup
#
setup: setup-certificates setup-docker
setup-certificates:
	./bin/gen-test-certificates.sh
setup-docker:
	docker-compose build web db api frontend

#
# Testing
#
test: test-front test-back
test-front:
	docker-compose run --rm frontend ./bin/test
test-back:
	docker-compose run --rm api make test

#
# Building
#
build: build-front build-back
build-front:
	docker-compose run --rm frontend ./bin/build
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
