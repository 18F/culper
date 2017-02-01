# Database migrations

## Creating a new migration

To create a new SQL migration script issue the following command

``` shell
goose create AddSomeColumn sql
```

## Synchronization

Each time the API server is executed it will use the provided database
connection information and attempt to synchronize migrations as needed.
Essentially it is similar to executing the following commands with some
additional logic:

``` shell
goose dbversion
goose up
```
