MAKEFLAGS += --silent

#
# Variables
#
release := $(shell git rev-list --tags --max-count=1)
version := $(shell git describe --tags $(release))
hash    := $(shell git rev-parse --short HEAD)
tag     := "$(version)-$(hash)"

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
               -v ${PWD}:/go/src/github.com/18F/e-QIP-prototype \
               -w /go/src/github.com/18F/e-QIP-prototype/api \
               -e "CGO_ENABLED=0" \
               golang:latest go build -ldflags '-w -extldflags "-static"' -o api
package-image:
	docker build -f Dockerfile.eapp_golang . -t eapp_golang:smallest

#
# Deploy
#
deploy: deploy-check deploy-configure deploy-login deploy-ecr deploy-s3
deploy-check:
	echo "Checking deployment prerequisites"
	if test -z "$$AWS_DEFAULT_REGION"; then echo "AWS_DEFAULT_REGION is missing"; exit 1; fi;
	if test -z "$$AWS_ECR_IMAGE"; then echo "AWS_ECR_IMAGE is missing"; exit 1; fi;
	if test -z "$$AWS_S3_BUCKET"; then echo "AWS_S3_BUCKET is missing"; exit 1; fi;
	if test -z "$$AWS_ACCESS_KEY_ID"; then echo "AWS_ACCESS_KEY_ID is missing"; exit 1; fi;
	if test -z "$$AWS_SECRET_ACCESS_KEY"; then echo "AWS_SECRET_ACCESS_KEY is missing"; exit 1; fi;
deploy-configure:
	echo "Configuring AWS CLI"
	aws --version
	aws configure set default.region ${AWS_DEFAULT_REGION}
	aws configure set default.output text
deploy-login:
	echo "Logging in to AWS"
	eval $(aws ecr get-login --no-include-email)
deploy-ecr:
	echo "Deploying to ECR"
	docker tag eapp_golang:smallest ${AWS_ECR_IMAGE}:${tag}
	docker push ${AWS_ECR_IMAGE}:${tag}
deploy-s3:
	echo "Deploying to S3"
	aws s3 sync ${PWD}/dist s3://${AWS_S3_BUCKET} --delete

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
