MAKEFLAGS += --silent

all: clean test build

test: test-front test-back
test-front:
	docker-compose run --rm frontend npm --no-color test
test-back:
	docker-compose run --rm api make test

build: build-front build-back
build-front:
	docker-compose run --rm frontend npm --no-color run build
build-back:
	docker-compose run --rm api make build

clean: stop clean-front clean-back
clean-front:
	rm -rf ./dist/*
	rm -rf ./coverage/*
	rm -rf ./jest*/
clean-back:
	rm -rf ./api/api

start:
	docker-compose start web api db

stop:
	docker-compose stop

run:
	docker-compose up web api db

docs:
	docker-compose up docs
