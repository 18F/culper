# Frontend

The frontend is built in [React](https://reactjs.org/), wired up with [React Router](https://reacttraining.com/react-router/) and [Redux](https://redux.js.org), compiled using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io). Styles are written in [SASS](https://sass-lang.com/), leveraging [USWDS](https://designsystem.digital.gov/).

## Table of Contents

- [Frontend Architecture](frontend-architecture.md)
- [Frontend Testing](frontend-testing.md)
- [Frontend Roadmap](frontend-roadmap.md)

## File Structure

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

## Debugging & Troubleshooting

- Use of the [React Developer Tools](https://github.com/facebook/react-devtools) and [Redux DevTools Extension](http://extension.remotedev.io/) are recommended for frontend work.
- With the React extension, the Redux store can be inspected by selecting the `<Provider>` component and running `$r.store.getState()` in your browser's JavaScript console.
- In the development environment, you may opt in to [Logger for Redux](https://github.com/evgenyrodionov/redux-logger) by appending `?reduxLogger=true` to the url on initial load.

## Adding/updating NPM packages

Whenever the `dependencies` list in [`package.json`](../package.json) is changed, make sure the [`yarn.lock`](../yarn.lock) gets updated as well:

```shell
docker-compose run --rm js yarn
```

then restart the server.

## Resources

- React 15.6.2 documentation: https://react-legacy.netlify.com/
- Redux: https://redux.js.org/
- React-Router v4: https://reacttraining.com/react-router
- Axios: https://github.com/axios/axios
- Redux-Saga: https://github.com/redux-saga/redux-saga
- Validate.JS: https://validatejs.org/
- Luxon (datetime handling): https://moment.github.io/luxon/
- Storybook: https://storybook.js.org/