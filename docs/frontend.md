# Frontend

The frontend is built in [React](https://reactjs.org/), wired up with [React Router](https://reacttraining.com/react-router/) and [Redux](https://redux.js.org), compiled using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io). Styles are written in [SASS](https://sass-lang.com/), leveraging [USWDS](https://designsystem.digital.gov/).

Here are some of the major directories:

- [`/`](..): Things like the [`package.json`](../package.json) and config files for other tools live at the root directory of the repository
- [`specs/`](../specs): [Integration tests](../specs/README.md)
- [`src/`](../src): All the frontend source files live here
  - [`actions/`](../src/actions): [Redux action creators](https://redux.js.org/basics/actions#action-creators)
  - [`components/`](../src/components): Underlying React components used by the views or other components. Each should have corresponding styles (where applicable), tests, etc. in the same subdirectory.
  - [`config/formSections/`](../src/config/formSections): Contains the section definitions for eApp supported forms
  - [`config/formSections/formTypes.js`](../src/config/formSections/formTypes.js): Config file that defines the different form types
  - [`config/locales/`](../src/config/locales): Where any user-visible text is stored
  - [`constants/`](../src/constants): Contains all the enums/constants used throughout the application
  - [`helpers/branches.js`](../src/helpers/branches): Contains functions that define whether a subsection/question is required by a specific form type. These are primarily used by the [selectors](../src/selectors/branches.js), which extract the data from Redux.
  - [`models/`](../src/models): Contains all the model definitions for sections and subsections that are used for validations
  - [`reducers/`](../src/reducers): [Redux reducers](https://redux.js.org/basics/reducers)
  - [`sass/`](../src/sass): Handful of shared SASS files
  - [`validators/`](../src/validators): The validation logic
  - [`views/`](../src/views): Higher-level React components that correspond to different pages/routes

## Troubleshooting

- Use of the [React Developer Tools](https://github.com/facebook/react-devtools) and [Redux DevTools Extension](http://extension.remotedev.io/) are recommended for frontend work.
- With the React extension, the Redux store can be inspected by running `$r.store.getState();` in your browser's JavaScript console.
- In the development environment, you may opt in to [Logger for Redux](https://github.com/evgenyrodionov/redux-logger) by appending `?reduxLogger=true` to the url on initial load.

## Tests

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

## Adding/updating NPM packages

Whenever the `dependencies` list in [`package.json`](../package.json) is changed, make sure the [`yarn.lock`](../yarn.lock) gets updated as well:

```shell
docker-compose run --rm js yarn
```

then restart the server.
