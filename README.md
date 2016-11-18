# e-QIP Prototype

[![Slack][badge_chat]][1]

|         | Builds                             | GPA                                | Accessibility                           |
| ------- | ---------------------------------- | ---------------------------------- | --------------------------------------- |
| Release | [![Build Status][badge_ci_18f]][2] | [![Code Climate][badge_cc_18f]][3] | [![Accessibility][badge_access_18f]][4] |
| Staging | [![Build Status][badge_ci_tt]][5]  | [![Code Climate][badge_cc_tt]][6]  | [![Accessibility][badge_access_tt]][7]  |

To create the e-QIP questionnaire prototype, the project team is employing a user-centered design approach leveraging key principles from the
[U.S. Digital Services Playbook](https://playbook.cio.gov/#plays_index_anchor):

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

The project team utilizes [ZenHub](https://www.zenhub.com/), a free online and GitHub-integrated project management tool, to administer User Stories, Tasks, and Sprints.

 - [Projects/Roadmap](https://github.com/truetandem/e-QIP-prototype/projects/1)
 - [Milestones/Sprints](https://github.com/truetandem/e-QIP-prototype/milestones)
 - [Epics/User Stories](https://github.com/truetandem/e-QIP-prototype/labels/Epic)
 - [Board/Backlog](https://github.com/truetandem/e-QIP-prototype#boards)

GitHub commits can be traced back to their corresponding tasks through commit comments.  Commits directly related to a task will be prefixed with the task ID:

```
truetandem/e-QIP-prototype#issue_number Commit description
```

[Keywords](https://help.github.com/articles/closing-issues-via-commit-messages/) can be used to change the status of the associated issue

## Getting to know the code

### Clone all things

First you are going to want to clone the repository

```
git clone https://github.com/18F/e-QIP-prototype
```

### Docker/docker-compose setup

`cd` into the repo and run:

```
$ docker-compose up
```

### Checking dependencies

For quick development we use [npm](https://www.npmjs.com/). Once
this has been installed we execute a single command:

```
npm install
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
results may be viewed after running ```npm start``` at
[http://localhost:8080/coverage](http://localhost:8080/coverage)

In-browser test results and coverage can be accessed at
[https://18f.github.io/e-QIP-prototype/test](https://18f.github.io/e-QIP-prototype/test)

> Note the **dist/coverage/** directory and associated files are not created until the test have been ran.

### Packaging Application

To package up the application, use the command:

```
npm run package
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

 - For JavaScript, [JSHint](http://jshint.com) which may be installed with ```npm install -g jshint```
 - For HTML, [html-lint](https://github.com/curtisj44/HTML-Lint) which may be installed with ```npm install -g html-lint```


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
