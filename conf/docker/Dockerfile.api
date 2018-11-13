FROM golang:1.10

# install Dep
RUN curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
# install Golint
RUN go get -u golang.org/x/lint/golint

WORKDIR /go/src/github.com/18F/e-QIP-prototype/api
ENV PATH="${PATH}:${GOPATH}/src/github.com/18F/e-QIP-prototype/api/bin"
# libxml2-utils provides xmllint and is only required for automated tests, not production use
RUN DEBIAN_FRONTEND=noninteractive apt-get -q -y update && apt-get -q -y install xmlsec1 strace libxml2-utils;

# install inotify-tools
RUN apt-get -q -y install inotify-tools

# install dependencies
COPY api/Gopkg.toml api/Gopkg.lock ./
RUN dep ensure -vendor-only

RUN curl https://raw.githubusercontent.com/codecov/codecov-bash/master/codecov > /usr/local/bin/codecov; \
    chmod 755 /usr/local/bin/codecov

CMD ./bin/run.sh
