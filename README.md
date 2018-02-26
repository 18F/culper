# e-QIP Prototype

[![Slack][badge_chat]][1]

|         | Builds                             | Coverage                        | GPA                                | Go                                              |
| ------- | ---------------------------------- | ------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Release | [![Build Status][badge_ci_18f]][2] | [![codecov][badge_cov_18f]][24] | [![Code Climate][badge_cc_18f]][3] | [![Go Report Card][badge_goreportcard_18f]][22] |
| Staging | [![Build Status][badge_ci_tt]][5]  | [![codecov][badge_cov_tt]][25]  | [![Code Climate][badge_cc_tt]][6]  | [![Go Report Card][badge_goreportcard_tt]][23]  |

To create the e-QIP questionnaire prototype, the project team is employing a user-centered design approach leveraging key principles from the
[U.S. Digital Services Playbook][8]:

1. Understand what people need
2. Address the whole experience, from start to finish
3. Make it simple and intuitive

## Table of contents

 - [Project Management](#project-management)
    - [Sprint Backlogs](#sprint-backlogs)
 - [Getting to know the code](#getting-to-know-the-code)
    - [Clone all things](#clone-all-things)
    - [Checking dependencies](#checking-dependencies)
    - [Running a local server](#running-a-local-server)
    - [Executing tests and coverage reports](#executing-tests-and-coverage-reports)
    - [Packaging Application](#packaging-application)
    - [Generating Documentation](#generating-documentation)
    - [Tooling](#tooling)

## Project Management

The project team utilizes [GitHub Projects][9] as an in integrated project management tool to administer User Stories, Tasks, and Sprints.

 - [Board/Backlog][10] - The Product Backlog can be viewed in the GitHub Project Board along with the items being worked on in the current sprint
 - [Milestones/Sprints][11] - Sprint durations are defined using GitHub Milestones, and backlog items (issues) worked on in a given sprint are tagged with a Milestone.
 - [Epics/User Stories][12] - GitHub issues are tagged with the "Epic" tag to denote the issue as a User Story

GitHub commits can be traced back to their corresponding tasks through commit comments.  Commits directly related to a task will be prefixed with the task ID:

```
truetandem/e-QIP-prototype#issue_number Commit description
```

[Keywords][13] can be used to change the status of the associated issue

## Sprint Backlogs
To view the items completed during each development sprint and to view the burndown charts for each respective sprint, please visit the [Sprint Backlogs][26] page.

## Getting to know the code

### Clone all things

Clone the repository and `cd` into it:

```
mkdir -p $GOPATH/src/github.com/18F
cd $GOPATH/src/github.com/18F
git clone https://github.com/18F/e-QIP-prototype
cd e-QIP-prototype
```

Then to develop locally, create a `.env` file:

```
cp .env.example .env
```

### Docker/docker-compose setup

Once `cd`'d into the cloned repository (and having created a `.env` file):

```
$ docker-compose up
```

### Checking dependencies

For quick development we use [yarn][19] but you may use [npm][16] as well. Once
this has been installed we execute a single command:

```
yarn install
```

For dependencies on the backend use [glide][17]:

```
glide install
```

### Building the application

Compiling all of the assets can be done simply using the command:

```
yarn build
```

This will compile JavaScript, SASS, and place all files where they need to be. Both versions of JavaScript files (minified and not) are preserved.

### Running a local server

To run a local server we are using [docker][21] containers leveraging the [docker-compose][20] tool:

```
docker-compose up
```

Then direct your browser at [http://localhost:8080](http://localhost:8080). The access the site in development use the username `test01` and password `password01`.

### Executing tests and coverage reports

To make a single pass through the test suite use the command:

```
yarn test
```

The individual test results will be seen in the output, and the coverage
results may be viewed after running ```yarn test```.

### Executing feature specifications

Running the feature specifications is an on-demand process and can be ran through [docker-compose][20] by specifying a different configuration file:

```
docker-compose -f nightwatch-compose.yml up
```

For additional informtion on how to perform the feature specification automated UI test suite, visit [Spec Test][27].

### Packaging Application

To package up the application, use the command:

```
yarn build
```

This will generate the following file structure:

```
dist/
   css/
   fonts/
   img/
   eqip.min.js
   index.html
```

where
 - `css/` contains the production ready stylesheets
 - `fonts/` contains the fonts used in the application
 - `img/` contains the images used in the application

### Tooling

#### Linters

For Ninjas (Vim) just install ```syntastic``` and everything should be handled.
For Pirates (Emacs) just install ```flycheck``` and everything should be handled.

For command-line alternatives there are the following:

 - For JavaScript, [JSHint][14] which may be installed with ```yarn add jshint```
 - For HTML, [html-lint][15] which may be installed with ```yarn add html-lint```

### Contributing

Please refer to the [contributing documentation][18].


[badge_chat]: https://img.shields.io/badge/chat-slack-green.svg
[badge_ci_18f]: https://circleci.com/gh/18F/e-QIP-prototype.svg?style=shield
[badge_cc_18f]: https://codeclimate.com/github/18F/e-QIP-prototype/badges/gpa.svg
[badge_cov_18f]: https://codecov.io/gh/18F/e-QIP-prototype/branch/master/graph/badge.svg
[badge_goreportcard_18f]: https://goreportcard.com/badge/github.com/18F/e-QIP-prototype
[badge_ci_tt]: https://circleci.com/gh/truetandem/e-QIP-prototype.svg?style=shield
[badge_cc_tt]: https://codeclimate.com/github/truetandem/e-QIP-prototype/badges/gpa.svg
[badge_cov_tt]: https://codecov.io/gh/truetandem/e-QIP-prototype/branch/master/graph/badge.svg
[badge_goreportcard_tt]: https://goreportcard.com/badge/github.com/truetandem/e-QIP-prototype
[1]: https://gsa-tts.slack.com/messages/acq-e-qip-vendor
[2]: https://circleci.com/gh/18F/e-QIP-prototype
[3]: https://codeclimate.com/github/18F/e-QIP-prototype
[4]: https://continua11y.18f.gov/18F/e-QIP-prototype
[5]: https://circleci.com/gh/truetandem/e-QIP-prototype
[6]: https://codeclimate.com/github/truetandem/e-QIP-prototype
[7]: https://continua11y.18f.gov/truetandem/e-QIP-prototype
[8]: https://playbook.cio.gov/#plays_index_anchor
[9]: https://help.github.com/articles/tracking-the-progress-of-your-work-with-projects
[10]: https://github.com/truetandem/e-QIP-prototype/projects/1?fullscreen=true
[11]: https://github.com/truetandem/e-QIP-prototype/milestones
[12]: https://github.com/truetandem/e-QIP-prototype/labels/Epic
[13]: https://help.github.com/articles/closing-issues-via-commit-messages/
[14]: http://jshint.com
[15]: https://github.com/curtisj44/HTML-Lint
[16]: https://www.npmjs.com
[17]: https://github.com/Masterminds/glide
[18]: CONTRIBUTING.md
[19]: https://yarnpkg.com
[20]: https://docs.docker.com/compose
[21]: https://docker.com
[22]: https://goreportcard.com/report/github.com/18F/e-QIP-prototype
[23]: https://goreportcard.com/report/github.com/truetandem/e-QIP-prototype
[24]: https://codecov.io/gh/18F/e-QIP-prototype
[25]: https://codecov.io/gh/truetandem/e-QIP-prototype
[26]: SPRINTS.MD
[27]: SPECTEST.MD
