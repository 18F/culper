# Frontend

The frontend is built in [React](https://reactjs.org/), wired up with [React Router](https://reacttraining.com/react-router/) and [Redux](https://redux.js.org), compiled using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io). Styles are written in [SASS](https://sass-lang.com/).

Here are some of the major directories:

* [`/`](..): Things like the [`package.json`](../package.json) and config files for other tools live at the root directory of the repository
* [`specs/`](../specs): [Integration tests](../specs/README.md)
* [`src/`](../src): All the frontend source files live here
  * [`actions/`](../src/actions): [Redux action creators](https://redux.js.org/basics/actions#action-creators)
  * [`components/`](../src/components): Underlying React components used by the views or other components. Each should have corresponding styles (where applicable), tests, etc. in the same subdirectory.
  * [`config/locales/`](../src/config/locales): Where any user-visible text is stored
  * [`reducers/`](../src/reducers): [Redux reducers](https://redux.js.org/basics/reducers)
  * [`sass/`](../src/sass): Handful of shared SASS files
  * [`validators/`](../src/validators): The validation logic
  * [`views/`](../src/views): Higher-level React components that correspond to different pages/routes
