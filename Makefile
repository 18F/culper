MAKEFLAGS += --silent

all: clean test build

docker-stop-all:
	docker-compose stop

test: test-front test-back
test-front:
	docker-compose run frontend npm test
test-back:
	docker-compose run api make test

build: build-front build-back
build-front:
	docker-compose run frontend npm run build
build-back:
	docker-compose run api make build

clean: docker-stop-all clean-front clean-back
clean-front:
	rm -rf ./dist/*
	rm -rf ./coverage/*
	rm -rf ./jest*/
clean-back:
	rm -rf ./api/api

run:
	docker-compose up web api db

docs:
	docker-compose up docs
