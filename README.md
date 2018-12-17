# e-QIP Prototype

[![Build Status][badge_ci_18f]][2] [![codecov][badge_cov_18f]][24] [![Code Climate][badge_cc_18f]][3] [![Go Report Card][badge_goreportcard_18f]][22]

To create the e-QIP questionnaire prototype, the project team is employing a user-centered design approach leveraging key principles from the [U.S. Digital Services Playbook][8]:

1. Understand what people need
1. Address the whole experience, from start to finish
1. Make it simple and intuitive

## Table of contents

- [Project Management](#project-management)
- [Development](#development)
- [Architectural diagram](#architectural-diagram)
- [Additional](#additional)
- [Contributing](#contributing)

## Project Management

The project team utilizes [GitHub Issues][9] to administer User Stories and Tasks, prioritized and tracked in [a Kanban board](https://github.com/18F/e-QIP-prototype/projects/1). Higher-level and non-development tasks are tracked in [a Trello board](https://trello.com/b/xexcFZ81/eapp-internal).

## Development

### Initial setup

#### Dependencies

- [git](https://git-scm.com)
- [docker][21]
- [docker-compose][20]
- [make](https://www.gnu.org/software/make/)

For more information on licenses and third-party source code, use a tool like [this one](https://github.com/bmallred/licenses).

#### Clone all things

Clone the repository and `cd` into it:

```shell
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

```shell
make
```

#### Feature Tests

Setup steps:

1. Edit _.env_ file
  * *API\_REDIRECT*=__http://web:8080__
  * *API\_BASE\_URL*=__http://api:3000__
1. Disable *SAML\_ENABLED* auth and enable *BASIC\_ENABLED*
1. Edit /etc/hosts file __OPTIONAL__
  * Add _web_ and _api_ to the end of the localhost line in /etc/hosts so you don't have to keep changing the values of API\_REDIRECT or API\_BASE\_URL in .env file back to localhost
1. Run __make run__ to ensure services are restarted
1. Run the purge directions from docs/test-scenarios.md to clear out old data

To run the feature specs locally:

```shell
make specs
```

Screenshots will be recorded in _specs/screenshots_

To run a single feature spec locally:

```shell
make specs COMMAND='bash -c "yarn run nightwatch --test features/identification.feature"'
```

### Running a local server

To run a local server, we are using [docker][21] containers leveraging the [docker-compose][20] tool via the command:

```shell
make run
```

Then direct your browser at [http://localhost:8080](http://localhost:8080). The access the site in development use the username `test01` and password `password01`. If you make changes to frontend files, the site will automatically rebuild after ~10 seconds.

#### How it works

The Make target calls Docker Compose, which then runs containers for various parts of the system. Frontend assets are built from their own containers into the `dist/` folder, which are then served by nginx. There is also an API backend (under [`api/`](api)) written in Go, which has a PostgreSQL database behind it. See the [architecture diagram](#architectural-diagram) below.

See also: [frontend docs](docs/frontend.md).

## Architectural diagram

![eapparchitecture](https://user-images.githubusercontent.com/12962390/37600234-1ecdb4ba-2b5d-11e8-99b3-a07f46aef611.png)

There are several possible architectures which may be implemented. The diagram references one of those possible solutions and highlights the basic flow of data within the system. It also demonstrates integration with external systems (e.g. identity services) which are not part of this project but may be part of the overall system.

## Additional

See [advanced docs](docs/advanced.md) for more.

### Tooling

#### Formatting

Supported files are formatted using [Prettier](https://prettier.io/), though note this should only be done when a file is new or heavily modified. You should install Prettier for whatever editor you use.

#### Linters

- Vim users: install `syntastic`
- Emacs users: install `flycheck`

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
