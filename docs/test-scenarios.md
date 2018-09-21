# Generating and loading test scenarios

Multiple test scenarios in JSON format are archived under:
[`api/testdata/complete-scenarios`](../api/testdata/complete-scenarios)

The `*.json` files contain the same JSON structures that the user interface generates and saves to the database. Each file represents a complete, valid SF-86 application that can be loaded into eApp and submitted to e-QIP.

## Generating new test JSON files

1. Sign into eApp with one of the test accounts (e.g., `test01`). 
1. Populate the form with a scenario, ensuring that it passes eApp validation.
1. Export the application data using `form`, specifying the same account and replacing `CONTAINERID` with the container id for the API backend. When prompted for a URL, specify `http://localhost:3000` or `https://localhost:3000`, depending if you have configured HTTPS.
```
docker exec -it CONTAINERID bin/form output.json
```


Note: The files in [`api/testdata/complete-scenarios`](../api/testdata/complete-scenarios) have been formated with the `jq` tool.

## Loading existing test JSON files

1. Clear the database of existing form data using `purge-all-user-data.sql`, replacing `CONTAINERID` with the container id for PostgreSQL. This will purge **ALL** user form data, but leave accounts and passwords intact. All accounts are unlocked.
```
docker cp purge-all-user-data.sql CONTAINERID:/tmp
docker exec --user postgres -it CONTAINERID psql -f /tmp/purge-all-user-data.sql
```

2. Load a test file with `load-scenario`, specifying one of the test accounts (e.g., `test01`) and replacing `CONTAINERID` with the container id for the API backend. When prompted for a URL, specify `http://localhost:3000` or `https://localhost:3000`, depending if you have configured HTTPS.
```
docker exec -it CONTAINERID bin/load-scenario testdata/complete-scenarios/test1.json
```
