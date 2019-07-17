MAKEFLAGS += --silent

#
# Variables
#
release := $(shell git rev-list --tags --max-count=1)
version := $(shell git describe --tags $(release))
hash    := $(shell git rev-parse --short HEAD)
tag     := "$(version)-$(hash)"
uid     := $(shell id -u)
gid     := $(shell id -g)
# use an arbitrary container
setup_container := "js"


all: clean setup lint test build
.SILENT: all
.PHONY: all

reset-permissions:
	$(info Resetting permissions)
	@docker-compose run --rm $(setup_container) ./bin/permissions $(uid) $(gid)

#
# Cleaning
#
clean: stop reset-permissions
	-@rm -rf ./dist/*
	-@rm -rf ./coverage/*
	-@rm -rf ./jest/*
	-@rm -rf ./api/bin/xmlsec1
	-@rm -rf ./api/api
	-@rm -rf ./api/eapp.key
	-@rm -rf ./api/eapp.crt
	-@rm -rf ./api/webservice/testdata/test.cer
	-@rm -rf ./api/webservice/testdata/test.key
	-@rm -rf ./api/webservice/testdata/test.pkcs.key

#
# Setup
#
setup: stop setup-containers setup-certificates setup-dependencies reset-permissions
setup-containers:
	$(info Building containers)
	@docker-compose build
setup-certificates:
	$(info Generating test certificates)
	@docker-compose run --rm $(setup_container) ./bin/test-certificates
setup-dependencies:
	$(info Installing dependencies)
	@docker-compose run --rm $(setup_container) ./bin/compile-xmlsec

#
# Linters
#
lint: lint-js lint-css lint-go
lint-js:
	$(info Running JavaScript linter)
	@docker-compose run --rm js yarn lint-js
lint-css:
	$(info Running SCSS linter)
	@docker-compose run --rm js yarn lint-css
lint-go:
	$(info Running Go linter)
	@docker-compose run --rm api ./bin/lint

#
# Testing
#
test: test-react test-go
test-react:
	$(info Running React test suite)
	@docker-compose run --rm js yarn test $(FLAGS) $(FILES)
test-go:
	$(info Running Go test suite)
	@docker-compose run --rm api make reset-test-db
	@docker-compose run --rm api make test

#
# Coverage
#
.PHONY: coverage
# Run coverage-go first – it removes its backend coverage data
# afterwards, so coverage-js will not label its report data as
# belonging to the frontend.
coverage: coverage-go coverage-js
coverage-js:
	$(info Running code coverage for JS)
	@docker-compose run --rm \
        -e "CODECOV_TOKEN=${CODECOV_TOKEN}" \
        js yarn coverage
coverage-go:
	$(info Running code coverage for Go)
	@docker-compose run --rm \
        -e "CODECOV_TOKEN=${CODECOV_TOKEN}" \
        api make coverage

#
# Building
#
build: build-frontend build-go build-cmd reset-permissions
build-frontend:
	$(info Compiling JS and CSS)
	@docker-compose run --rm js yarn build-js
build-go:
	$(info Compiling Go application)
	@docker-compose run --rm api make build
build-cmd:
	$(info Compiling Go commands)
	docker-compose run --rm api make cmd

#
# Suites
#
react: test-react build-frontend reset-permissions
go: test-go build-go reset-permissions

#
# Checksums
#
checksum:
	@docker-compose run --rm $(setup_container) ./bin/checksum
check:
	@docker-compose run --rm $(setup_container) ./bin/checksum "test"

# seccomp
#
seccomp:
seccomp-pre:
	@docker run --name=eapp_strace \
              --rm \
              -v /tmp/strace:/tmp/strace \
              -v /home/bryan/src/github.com/18F/e-QIP-prototype:/go/src/github.com/18F/e-QIP-prototype \
              -w /go/src/github.com/18F/e-QIP-prototype/api \
              eqipprototype_api ./bin/seccomp-setup
seccomp-exec:
	@docker run --name=eapp_strace \
              --cap-drop ALL \
              --cap-add SYS_ADMIN \
              --cap-add NET_ADMIN \
              --cap-add SYS_PTRACE \
              --security-opt apparmor=docker-default \
              --security-opt=no-new-privileges \
              --rm \
              --network=eqipprototype_eapp \
              --expose=3000 \
              -e "DATABASE_USER=postgres" \
              -e "DATABASE_NAME=postgres" \
              -e "DATABASE_HOST=db:5432" \
              -v /tmp/strace:/tmp/strace \
              -v /home/bryan/src/github.com/18F/e-QIP-prototype:/go/src/github.com/18F/e-QIP-prototype \
              -w /go/src/github.com/18F/e-QIP-prototype/api \
              eqipprototype_api ./bin/seccomp make test
seccomp-post:
	docker run --name=eapp_strace \
              --rm \
              -it \
              -v /tmp/strace:/tmp/strace \
              -v /home/bryan/src/github.com/18F/e-QIP-prototype:/go/src/github.com/18F/e-QIP-prototype \
              -w /go/src/github.com/18F/e-QIP-prototype/api \
              eqipprototype_api /bin/bash
#
# Operations
#
down:
	docker-compose down
start:
	docker-compose start
stop:
	docker-compose stop
run:
	docker-compose rm -f api js
	$(info Running local development server)
	docker-compose up --abort-on-container-exit --build
identity:
	docker-compose -f docker-compose.yml -f docker-compose.identity.yml up identity
tag:
	echo $(tag)
