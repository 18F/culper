# Advanced development documentation

## Multi-host setup

See [documentation](../docs/multi-host.md).

## SAML

See [documentation](../docs/saml.md).

## Reset locked app submission

In the terminal run the following:

```shell
docker-compose exec db psql -U postgres
```

Then execute the SQL:

```sql
begin;
update accounts set locked = false where username = 'test01';
commit;
```

The submission will be unlocked and you can go back through the application.

## Building the application

Compiling all of the assets can be done simply using the command:

```shell
make build
```

This is generally only needed for deployment.

## Executing tests and coverage reports

To make a single pass through the test suite use the command:

```shell
make test
make coverage
```

See [frontend test information](../docs/frontend.md#tests). API tests use [Go's `testing` package](https://golang.org/pkg/testing/).

## Adding/updating Go packages

Whenever the packages used by the API change, update the [Dep](https://golang.github.io/dep/) files:

```shell
docker-compose run --rm api dep ensure -no-vendor
```

then restart the server.

## Generating Documentation

To generate documentation from the source code and database schema type:

```shell
make docs
```

All of the documentation may then be found in the respective directories under `doc/`.
