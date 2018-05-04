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


all: clean setup lint test build
.SILENT: all
.PHONY: all

reset-permissions:
	$(info Resetting permissions)
	@docker-compose run --rm deps ./bin/permissions $(uid) $(gid)

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
	@docker-compose build deps frontend web db api
setup-certificates:
	$(info Generating test certificates)
	@docker-compose run --rm deps ./bin/test-certificates
setup-dependencies:
	$(info Installing dependencies)
	@docker-compose run --rm deps ./bin/compile-xmlsec

#
# Linters
#
lint: lint-js lint-css lint-go
lint-js:
	$(info Running JavaScript linter)
	@docker-compose run --rm frontend ./node_modules/.bin/eslint src/
lint-css:
	$(info Running SCSS linter)
	@docker-compose run --rm frontend yarn lint
lint-go:
	$(info Running Go linter)
	@docker-compose run --rm api ./bin/lint

#
# Testing
#
test: test-react test-go
test-react:
	$(info Running React test suite)
	@docker-compose run --rm frontend ./bin/test
test-go:
	$(info Running Go test suite)
	@docker-compose run --rm api make test

#
# Integration testing
#
specs:
	$(info Running integration test suite)
	@docker-compose -f nightwatch-compose.yml up

#
# Coverage
#
coverage:
	$(info Running code coverage)
	@./bin/coverage

#
# Building
#
build: build-react build-go reset-permissions
build-react:
	$(info Compiling React application)
	@docker-compose run --rm frontend ./bin/build
build-go:
	$(info Compiling Go application)
	@docker-compose run --rm api make build

#
# Packaging
#
package: package-react package-go
package-clean:
	-@docker rmi -f eapp_golang:smallest
	-@docker rmi -f eapp_react:basedeb
	-@docker rm -f eapp_react_container
package-react:
	@docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis_eapp:base
	@docker create --name=eapp_react_container ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis_eapp:base
	@docker cp ./dist/. eapp_react_container:/var/www/html/
	@docker commit eapp_react_container eapp_react
package-go:
	@docker run --rm \
               -v ${PWD}:/go/src/github.com/18F/e-QIP-prototype \
               -w /go/src/github.com/18F/e-QIP-prototype/api/cmd/server \
               -e "CGO_ENABLED=0" \
               golang:latest go build -ldflags '-w -extldflags "-static"'
	-@mkdir -p ./api/dist/tmp
	-@mkdir -p ./api/dist/bin
	-@cp -R ./api/migrations ./api/dist/
	-@cp -R ./api/templates ./api/dist/
	-@cp ./api/bin/xmlsec1 ./api/dist/bin/
	-@cp ./api/checksum ./api/dist/
	-@cp ./api/cmd/server/server ./api/dist/eapp-backend
	@docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis-ecr:basedeb
	@docker build -f Dockerfile.eapp_golang . -t eapp_golang:smallest

#
# Deploy
#
deploy: deploy-check deploy-configure deploy-go deploy-react
deploy-check:
	echo "Checking deployment prerequisites"
	if test -z "$$AWS_DEFAULT_REGION"; then echo "AWS_DEFAULT_REGION is missing"; exit 1; fi;
	if test -z "$$AWS_ACCOUNT_ID"; then echo "AWS_ACCOUNT_ID is missing"; exit 1; fi;
	if test -z "$$AWS_ACCESS_KEY_ID"; then echo "AWS_ACCESS_KEY_ID is missing"; exit 1; fi;
	if test -z "$$AWS_SECRET_ACCESS_KEY"; then echo "AWS_SECRET_ACCESS_KEY is missing"; exit 1; fi;
	if test -z "$$DOCKER_TAG"; then echo "DOCKER_TAG is missing"; exit 1; fi;
deploy-configure:
	echo "Configuring AWS CLI"
	aws --version
	aws configure set default.aws_access_key_id ${AWS_ACCESS_KEY_ID}
	aws configure set default.aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
	aws configure set default.region ${AWS_DEFAULT_REGION}
	aws configure set default.output text
deploy-go:
	echo "Deploying Go image to repository"
	docker tag eapp_golang:smallest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis-ecr:${version}
	docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis-ecr:${version}
deploy-react:
	echo "Deploying React image to repository"
	docker tag eapp_react:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis_eapp:${DOCKER_TAG}
	docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis_eapp:${DOCKER_TAG}

#
# Suites
#
react: test-react build-react reset-permissions
go: test-go build-go reset-permissions

#
# Checksums
#
checksum:
	@docker-compose run --rm deps ./bin/checksum
check:
	@docker-compose run --rm deps ./bin/checksum "test"

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
	docker-compose start web api db
stop:
	docker-compose stop
run:
	docker-compose up web api db
docs:
	docker-compose up docs
tag:
	echo $(tag)
