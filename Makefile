MAKEFLAGS += --silent

#
# Variables
#
release := $(shell git rev-list --tags --max-count=1)
version := $(shell git describe --tags $(release))
hash    := $(shell git rev-parse --short HEAD)
tag     := "$(version)-$(hash)"

all: clean setup lint test build

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
	rm -rf ./api/bin/xmlsec1
	rm -rf ./api/api

#
# Setup
#
setup: setup-certificates setup-docker setup-xmlsec
setup-certificates:
	./bin/gen-test-certificates.sh
setup-docker: setup-docker-react setup-docker-go
setup-docker-react:
	docker-compose build frontend
	docker-compose run --rm frontend yarn install
setup-docker-go:
	docker-compose build web db api
	docker-compose run --rm api ./bin/install
setup-xmlsec:
	docker-compose run --rm api ./bin/compile-xmlsec

#
# Linters
#
lint: lint-react
lint-react:
	docker-compose run --rm frontend yarn lint

#
# Testing
#
test: test-react test-go
test-react: test-front
test-front:
	docker-compose run --rm frontend yarn lint
	docker-compose run --rm frontend ./bin/test
test-go: test-back
test-back:
	docker-compose run --rm api make test

#
# Integration testing
#
specs:
	docker-compose -f nightwatch-compose.yml up

#
# Coverage
#
coverage: coverage-react
coverage-react:
	docker-compose run --rm frontend ./bin/coverage

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
package: package-react package-go
package-clean:
	docker rmi -f eapp_golang:smallest
	docker rmi -f eapp_react:base
	docker rm -f eapp_react_container
package-react:
	docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis_eapp:base
	docker create --name=eapp_react_container ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/nbis_eapp:base
	docker cp ./dist/ eapp_react_container:/var/www/html/
	docker commit eapp_react_container eapp_react
package-go: package-go-static package-go-image
package-go-static:
	docker run --rm \
               -v ${PWD}:/go/src/github.com/18F/e-QIP-prototype \
               -w /go/src/github.com/18F/e-QIP-prototype/api \
               -e "CGO_ENABLED=0" \
               golang:latest go build -ldflags '-w -extldflags "-static"' -o api
package-go-image:
	docker build -f Dockerfile.eapp_golang . -t eapp_golang:smallest

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
tag:
	echo $(tag)
