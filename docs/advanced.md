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


## Docker

The current build process generates a lot of orphaned docker volumes in the host environment over time. Developers must periodically run `docker volume prune` in order to reclaim disk space. For example:
```
# docker volume prune
WARNING! This will remove all volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
5d9da5bc4aaf2f7712441c5987467b790701c9c51be23276f7c68210e81c6268
...
4fb67c37880afd51eb775631cf9d227bb5afbf256393c91dd78f1c8ac0c75279

Total reclaimed space: 2.539 GB
```
