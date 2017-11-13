MAKEFLAGS += --silent

all: clean test build

# go test -cover -coverageprofile=coverage.out $(shell go list ./... | grep -v /vendor/)
#
# test:
# 	rm -rf .cover
# 	mkdir .cover
# 	GOPKGS=$(foreach pkg, $(shell go list ./...), $(if $(findstring /vendor/, $(pkg)), , $(pkg)))
# 	@for pkg in $(GOPKGS); do \
# 		cmd="go test -coverprofile=.cover/$$pkg $$pkg"; \
# 		eval $$cmd; \
# 		if test $$? -ne 0; then \
# 			exit 1; \
# 		fi; \
# 	done

test:
	glide install
	GOLANG_ENV=test go test -cover $(shell go list ./... | grep -v /vendor/)

build:
	go build -o api

clean:
	rm -f ./api
