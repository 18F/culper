# e-QIP Prototype

[![Slack][badge_chat]][1]

|         | Builds                             | GPA                                | Accessibility                           |
| ------- | ---------------------------------- | ---------------------------------- | --------------------------------------- |
| Release | [![Build Status][badge_ci_18f]][2] | [![Code Climate][badge_cc_18f]][3] | [![Accessibility][badge_access_18f]][4] |
| Staging | [![Build Status][badge_ci_tt]][5]  | [![Code Climate][badge_cc_tt]][6]  | [![Accessibility][badge_access_tt]][7]  |

To create the e-QIP questionnaire prototype, the project team is employing a user-centered design approach leveraging key principles from the
[U.S. Digital Services Playbook][8]:

1. Understand what people need
2. Address the whole experience, from start to finish
3. Make it simple and intuitive

## Table of contents

 - [Project Management](#project-management)
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

 - [Board/Backlog][10]
 - [Milestones/Sprints][11]
 - [Epics/User Stories][12]

GitHub commits can be traced back to their corresponding tasks through commit comments.  Commits directly related to a task will be prefixed with the task ID:

```
truetandem/e-QIP-prototype#issue_number Commit description
```

[Keywords][13] can be used to change the status of the associated issue

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

For quick development we use [npm][16]. Once
this has been installed we execute a single command:

```
npm install
```

For dependencies on the backend use [glide][17]:

```
glide install
```

### Building the application

Compiling all of the assets can be done simply using the command:

```
npm run build
```

This will compile JavaScript, SASS, and place all files where they need to be. Both versions of JavaScript files (minified and not) are preserved.

### Running a local server

To run a local server we issue the command:

```
npm start
```

Then direct your browser at [http://localhost:8080](http://localhost:8080)

### Executing tests and coverage reports

To make a single pass through the test suite use the command:

```
npm test
```

The individual test results will be seen in the output, and the coverage
results may be viewed after running ```npm test```.

### Packaging Application

To package up the application, use the command:

```
npm run build
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

### Generating Documentation

This project utilizes JSDoc 3 to generate and render Javascript documentation artifacts. An npm script `docgen` is included that triggers the generation of these artifacts and then stores them in the `doc/` directory.

To generate the JSDoc, execute the following:

```
npm run docgen
```

The script specifically executes the following:

```
./node_modules/.bin/jsdoc ./src/ -r -d ./doc --readme README.md
```

### Tooling

#### Linters

For Ninjas (Vim) just install ```syntastic``` and everything should be handled.
For Pirates (Emacs) just install ```flycheck``` and everything should be handled.

For command-line alternatives there are the following:

 - For JavaScript, [JSHint][14] which may be installed with ```npm install -g jshint```
 - For HTML, [html-lint][15] which may be installed with ```npm install -g html-lint```

### Contributing

Please refer to the [contributing documentation][18].


[badge_chat]: https://img.shields.io/badge/chat-slack-green.svg
[badge_ci_18f]: https://travis-ci.org/18F/e-QIP-prototype.svg?branch=master
[badge_cc_18f]: https://codeclimate.com/github/18F/e-QIP-prototype/badges/gpa.svg
[badge_access_18f]: https://continua11y.18f.gov/18F/e-QIP-prototype.svg?branch=master
[badge_ci_tt]: https://travis-ci.org/truetandem/e-QIP-prototype.svg?branch=master
[badge_cc_tt]: https://codeclimate.com/github/truetandem/e-QIP-prototype/badges/gpa.svg
[badge_access_tt]: https://continua11y.18f.gov/truetandem/e-QIP-prototype.svg?branch=master
[1]: https://gsa-tts.slack.com/messages/acq-e-qip-vendor
[2]: https://travis-ci.org/18F/e-QIP-prototype
[3]: https://codeclimate.com/github/18F/e-QIP-prototype
[4]: https://continua11y.18f.gov/18F/e-QIP-prototype
[5]: https://travis-ci.org/truetandem/e-QIP-prototype
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
