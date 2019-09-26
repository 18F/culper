# Frontend Testing

Unit tests are written in [Jest](https://jestjs.io/), with [snapshot tests](https://jestjs.io/docs/en/snapshot-testing) for ensuring components don't inadvertently change.

To run the React test suite:

```shell
make test-react
```

To run a subset of tests, use the `FILES` argument, using a space as a delimiter between file paths:

```shell
make test-react FILES="src/components/Navigation/Navigation.test.jsx src/components/Navigation/SectionLink.test.jsx"
```

If changes are made that require updating a snapshot(s), pass the appropriate flag using the `FLAGS` argument:

```shell
make test-react FLAGS="--updateSnapshot"
```

[Information about integration tests.](../specs/README.md)

## Test Coverage
In order to maintain high quality code and reduce defects, all merged code is expected to have accompanying tests. We track code coverage by leveraging [Istanbul](https://istanbul.js.org/), which is included with [Jest](https://jestjs.io/).

By default, coverage reports are hidden because it causes the tests to run slower and the report outputs are verbose. It is up to each individual developer to setup their personal development environment if they want to see the coverage report.

In `package.json`, under `scripts`, there is a command called `test`. Coverage reports can be turned on by adding the `--coverage` flag.

In addition to that, an HTML version of the coverage report located at `coverage/lcov-report/index.html`.
