# e-QIP Prototype

[![Slack][badge_chat]][1] (TTS only)

[![Build Status][badge_ci_18f]][2] [![codecov][badge_cov_18f]][24] [![Code Climate][badge_cc_18f]][3] [![Go Report Card][badge_goreportcard_18f]][22]

To create the e-QIP questionnaire prototype, the project team is employing a user-centered design approach leveraging key principles from the [U.S. Digital Services Playbook][8]:

1. Understand what people need
2. Address the whole experience, from start to finish
3. Make it simple and intuitive

## Table of contents

 - [Project Management](#project-management)
 - [Getting to know the code](#getting-to-know-the-code)
    - [Dependencies](#dependencies)
    - [Clone all things](#clone-all-things)
    - [Running the application](#running-the-application)
       - [Setup](#setup)
       - [Building the application](#building-the-application)
       - [Executing tests and coverage reports](#executing-tests-and-coverage-reports)
       - [Running a local server](#running-a-local-server)
       - [Reset locked app submission](#reset-locked-submission)
 - [Docker containers](#docker-containers)
 - [Architectural diagram](#architectural-diagram)
 - [Additional](#additional)
    - [Feature specifications](#feature-specifications)
    - [Generating documentation](#generating-documentation)
    - [Tooling](#tooling)
 - [Contributing](#contributing)

## Project Management

The project team utilizes [GitHub Issues][9] to administer User Stories and Tasks.

 - [Milestones/Sprints][11] - Sprint durations are defined using GitHub Milestones, and backlog items (issues) worked on in a given sprint are tagged with a Milestone.
 - [Epics/User Stories][12] - GitHub issues are tagged with the "Epic" tag to denote the issue as a User Story

GitHub commits can be traced back to their corresponding tasks through commit comments.  Commits directly related to a task will be prefixed with the task ID:

```
18F/e-QIP-prototype#issue_number Commit description
```

[Keywords][13] can be used to change the status of the associated issue

## Sprint Backlogs

To view the items completed during each development sprint and to view the burndown charts for each respective sprint, please visit the [Sprint Backlogs][26] page.

## Development

### Initial setup

#### Dependencies

 - [git](https://git-scm.com)
 - [docker][21]
 - [docker-compose][20]
 - [make](https://www.gnu.org/software/make/)

For more information on licenses and third-party source code please refer to the [dependencies](docs/DEPENDENCIES.md) documentation.

#### Clone all things

Clone the repository and `cd` into it:

```shell
mkdir -p $GOPATH/src/github.com/18F
cd $GOPATH/src/github.com/18F
git clone https://github.com/18F/e-QIP-prototype
cd e-QIP-prototype
```

Then to develop locally, create a [`.env`](.env.example) file:

```shell
cp .env.example .env
```

For more information on the various settings, examples, and values please refer to the [configuration](docs/CONFIGURATION.md) documentation.

#### Tests

To do the initial setup and ensure that all tests pass locally:

``` shell
make
```

#### Multi-host setup

See [documentation](docs/multi-host.md).

### Running a local server

To run a local server, we are using [docker][21] containers leveraging the [docker-compose][20] tool via the command:

```shell
make run
```

Then direct your browser at [http://localhost:8080](http://localhost:8080). The access the site in development use the username `test01` and password `password01`. If you make changes to frontend files, the site will automatically rebuild after ~10 seconds.

#### SAML

See [documentation](docs/saml.md).

### Reset locked app submission
In the terminal run the following:

1. `docker ps -a | grep e-qip-prototype_db_1` and use the db value in the next command.
1. `docker exec -it <DB HERE> /bin/bash`
1. `su - postgres`
1. `psql`
1. `begin;`
1. `update accounts set locked = false where username = 'test01';`
1. `commit;`

The submission will be unlocked and you can go back through the application.

#### How it works

The Make target calls Docker Compose, which then runs containers for various parts of the system. Frontend assets are built from their own containers into the `dist/` folder, which are then served by nginx. Nginx also proxies API requests to an API backend written in Go, which has a PostgreSQL container behind it. See the [architecture diagram](#architectural-diagram) below.

The frontend is built in [React](https://reactjs.org/), wired up with [React Router](https://reacttraining.com/react-router/) and [Redux](https://redux.js.org), compiled using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io).

### Building the application

Compiling all of the assets can be done simply using the command:

```shell
make build
```

This is generally only needed for deployment.

### Executing tests and coverage reports

To make a single pass through the test suite use the command:

```shell
make test
make coverage
```

Frontend tests are written in [Jest](https://facebook.github.io/jest/), while the API tests use [Go's `testing` package](https://golang.org/pkg/testing/).

### Adding/updating NPM packages

Whenever the `dependencies` list in [`package.json`](package.json) is changed, make sure the [`yarn.lock`](yarn.lock) gets updated as well:

```shell
docker-compose run --rm js yarn
```

then restart the server.

### Adding/updating Go packages

Whenever the packages used by the API change, update the [Dep](https://golang.github.io/dep/) files:

```shell
docker-compose run --rm api dep ensure -no-vendor
```

then restart the server.

## Architectural diagram

![eapparchitecture](https://user-images.githubusercontent.com/12962390/37600234-1ecdb4ba-2b5d-11e8-99b3-a07f46aef611.png)

There are several possible architectures which may be implemented. The diagram references one of those possible solutions and highlights the basic flow of data within the system. It also demonstrates integration with external systems (e.g. identity services) which are not part of this project but may be part of the overall system.


## Additional

### Feature specifications

Running the feature specifications is an on-demand process and can be ran using:

```shell
make specs
```

For additional information on how to perform the feature specification automated UI test suite, visit [Spec Test][27].

### Generating Documentation

To generate documentation from the source code and database schema type:

```shell
make docs
```

All of the documentation may then be found in the respective directories under `doc/`.

### Troubleshooting

- Use of the [React Developer Tools](https://github.com/facebook/react-devtools) and [Redux DevTools Extension](http://extension.remotedev.io/) are recommended for frontend work.
- With the React extension, the Redux store can be inspected by running `$r.store.getState();` in your browser's JavaScript console.

### Tooling

#### Formatting

JavaScript files are formatted using [Prettier](https://prettier.io/), though note this should only be done when a file is new or heavily modified. You should install Prettier for whatever editor you use.

#### Linters

* Vim users: install `syntastic`
* Emacs users: install `flycheck`

For command-line alternatives there are the following:

 - For CSS, run `make lint-css`
 - For JavaScript, run `make lint-js`
 - For HTML, [html-lint][15] which may be installed with `yarn add html-lint`

## Contributing

Please refer to the [contributing documentation][18].

[badge_chat]: https://img.shields.io/badge/chat-slack-green.svg
[badge_ci_18f]: https://circleci.com/gh/18F/e-QIP-prototype.svg?style=shield
[badge_cc_18f]: https://codeclimate.com/github/18F/e-QIP-prototype/badges/gpa.svg
[badge_cov_18f]: https://codecov.io/gh/18F/e-QIP-prototype/branch/master/graph/badge.svg
[badge_goreportcard_18f]: https://goreportcard.com/badge/github.com/18F/e-QIP-prototype
[1]: https://gsa-tts.slack.com/messages/acq-e-qip-vendor
[2]: https://circleci.com/gh/18F/e-QIP-prototype
[3]: https://codeclimate.com/github/18F/e-QIP-prototype
[4]: https://continua11y.18f.gov/18F/e-QIP-prototype
[5]: https://circleci.com/gh/18F/e-QIP-prototype
[6]: https://codeclimate.com/github/18F/e-QIP-prototype
[7]: https://continua11y.18f.gov/truetandem/e-QIP-prototype
[8]: https://playbook.cio.gov/#plays_index_anchor
[9]: https://help.github.com/articles/tracking-the-progress-of-your-work-with-projects
[11]: https://github.com/18F/e-QIP-prototype/milestones
[12]: https://github.com/18F/e-QIP-prototype/labels/Epic
[13]: https://help.github.com/articles/closing-issues-via-commit-messages/
[14]: http://jshint.com
[15]: https://github.com/curtisj44/HTML-Lint
[16]: https://www.npmjs.com
[18]: CONTRIBUTING.md
[19]: https://yarnpkg.com
[20]: https://docs.docker.com/compose
[21]: https://docker.com
[22]: https://goreportcard.com/report/github.com/18F/e-QIP-prototype
[23]: https://goreportcard.com/report/github.com/18F/e-QIP-prototype
[24]: https://codecov.io/gh/18F/e-QIP-prototype
[25]: https://codecov.io/gh/truetandem/e-QIP-prototype
[26]: docs/SPRINTS.md
[27]: docs/SPECTEST.md
