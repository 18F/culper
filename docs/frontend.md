# Frontend

The frontend is built in [React](https://reactjs.org/), wired up with [React Router](https://reacttraining.com/react-router/) and [Redux](https://redux.js.org), compiled using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io). Styles are written in [SASS](https://sass-lang.com/).

Here are some of the major directories:

- [`/`](..): Things like the [`package.json`](../package.json) and config files for other tools live at the root directory of the repository
- [`specs/`](../specs): [Integration tests](../specs/README.md)
- [`src/`](../src): All the frontend source files live here
  - [`actions/`](../src/actions): [Redux action creators](https://redux.js.org/basics/actions#action-creators)
  - [`components/`](../src/components): Underlying React components used by the views or other components. Each should have corresponding styles (where applicable), tests, etc. in the same subdirectory.
  - [`config/locales/`](../src/config/locales): Where any user-visible text is stored
  - [`reducers/`](../src/reducers): [Redux reducers](https://redux.js.org/basics/reducers)
  - [`sass/`](../src/sass): Handful of shared SASS files
  - [`validators/`](../src/validators): The validation logic
  - [`views/`](../src/views): Higher-level React components that correspond to different pages/routes

## Troubleshooting

- Use of the [React Developer Tools](https://github.com/facebook/react-devtools) and [Redux DevTools Extension](http://extension.remotedev.io/) are recommended for frontend work.
- With the React extension, the Redux store can be inspected by running `$r.store.getState();` in your browser's JavaScript console.
- You may opt in to [Logger for Redux](https://github.com/evgenyrodionov/redux-logger) by appending `logger` as a query param on initial load (`?logger`).

## Tests

Unit tests are written in [Jest](https://facebook.github.io/jest/), with [snapshot tests](https://jestjs.io/docs/en/snapshot-testing) for ensuring components don't inadvertently change.

[Information about integration tests.](../specs/README.md)

## Adding/updating NPM packages

Whenever the `dependencies` list in [`package.json`](../package.json) is changed, make sure the [`yarn.lock`](../yarn.lock) gets updated as well:

```shell
docker-compose run --rm js yarn
```

then restart the server.
