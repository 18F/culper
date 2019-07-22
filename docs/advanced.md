# Advanced development documentation

## Multi-host setup

See [documentation](../docs/multi-host.md).

## SAML

See [documentation](../docs/saml.md).

## Changes requiring API and database updates

See [documentation](../docs/updating-api-db.md).

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

## Cloud Foundry (cloud.gov)

### Failed deployments

There is a known issue with [cloud.gov](https://cloud.gov/) [blue-green deployments](https://docs.cloudfoundry.org/devguide/deploy-apps/blue-green.html), where occasionally a deploy will fail. Below is an example error from [CircleCI](https://circleci.com/gh/18F/e-QIP-prototype/2831):

```
Renaming app eqip-prototype-dev to eqip-prototype-dev-venerable in org gsa-acq-eqip / space dev as 7c68f775-0a9e-4be4-be4c-b34c3ec76daf...
error: Server error, status code: 400, error code: 100002, message: The app name is taken: eqip-prototype-dev-venerable
Exited with code 1
```

The resolution requires a cloud.gov user, with admin rights on the eApp space (i.e., `gsa-acq-eqip`) to manually delete the app name with the `venerable` suffix, using the [Cloud Foundry command line interface](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html):

```
cf login -a api.fr.cloud.gov -u INSERT-USERNAME-HERE -o gsa-acq-eqip -s production --sso
cf target -s dev
cf delete eqip-prototype-dev-venerable
```

Make sure that the `venerable` application displayed in the error log is the application that is being deleted; it will be a variant of the frontend (`eqip-prototype`) or the backend (`eqip-prototype-api`). The presence of `dev`, `staging`, or no moniker in the application name will indicate whether your target space should be `dev`, `staging`, or `production` respectively.

The application should re-deploy correctly at this point, either on the next commit to the associated GitHub branch, or through a manual rerun of the failed CircleCI job.

### Purging the database

If you desire to remove all data from the db, you can use `dbreset` and `dbmigrate` to return to a pristine state. `dbreset` will delete the entire database and create a new one and then `dbmigrate` will run all the migrations, setting up the tables correctly. The default DATABASENAME for eApp is "postgres"
```
docker exec CONTAINERID bin/dbreset DATABASENAME
docker exec CONTAINERID bin/dbmigrate -migrations_path ./migrations DATABASENAME
```

### Getting DB info for the cloud.gov instance

To perform database operations on cloud.gov databases, you need to get the connection parameters. The following approach may be used to do so. It requires `cf`, the [`cf-service-connect`](cf-service-connect) plug-in and the PostgreSQL `psql` client. Additional details can be found in the [cloud.gov database documentation](https://cloud.gov/docs/services/relational-database/#manually-access-a-database).

```
cf login -a api.fr.cloud.gov -u INSERT-USERNAME-HERE -o gsa-acq-eqip -s production --sso
cf target -s dev
cf connect-to-service -no-client eqip-prototype-api-dev eqip-postgres
```

`cf connect-to-service` will print out something similar to:

```
Host: localhost
Port: GENERATED-PORT
Username: GENERATED-USER
Password: GENERATED-PASS
Name: GENERATED-DB
```

With this data, you can set the associated env vars and then modify the database using tools like `dbmigrate` or `dbreset`
