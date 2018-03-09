# THALES
##### TODO: Everything (WIP)...

### TODO's
#### Scripts
  - remove-node-modules: works
  - remove-git: works
  - get-deps: works
  - env-vars: works
  - new-project: works
  - dev: works
  - docker:dev: NOT WORKING
  - docker:remote-dev: NOT WORKING
  - prod: works
  - docker:prod: NOT WORKING
  - docker:remote-prod: NOT WORKING
  - test: works (Well, kinda. Script runs successfully but not tests have been written yet...)
  - test:watch: DOESNT WORK
  - test:unit: DOESNT WORK
  - test:integration: DOESNT WORK
  - docker:remote-test: DOESNT WORK
  - lint: works
  - lint:watch: DOESNT WORK
  - lint:fix: DOESNT WORK
  - docs: DOESNT WORK
  - coverage: DOESNT WORK
  - postdocs: DOESNT WORK
  - postcoverage: DOESNT WORK
  - postpublish: DOESNT WORK
  - validate: works (Kinda. Script runs without fail, but currently no tests written and linting rules are bad)
  - deploy: DOESNT WORK

#### Other stuff
  - CI: TODO
  - Dockerize
  - Create scripts for generating desired initial setup needs
  - Coverage: TODO
  - Sentry: TODO
  - Testing: TODO (prefer Jest...)





++++ FROM express-rest-es2017-boilerplate
# Express ES2017 REST API Boilerplate
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![npm version](https://badge.fury.io/js/express-rest-es2017-boilerplate.svg)](https://badge.fury.io/js/express-rest-es2017-boilerplate) [![Build Status](https://travis-ci.org/danielfsousa/express-rest-es2017-boilerplate.svg?branch=master)](https://travis-ci.org/danielfsousa/express-rest-es2017-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/danielfsousa/express-rest-es2017-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/danielfsousa/express-rest-es2017-boilerplate?branch=master) [![bitHound Overall Score](https://www.bithound.io/github/danielfsousa/express-rest-es2017-boilerplate/badges/score.svg)](https://www.bithound.io/github/danielfsousa/express-rest-es2017-boilerplate) [![Greenkeeper badge](https://badges.greenkeeper.io/danielfsousa/express-rest-es2017-boilerplate.svg)](https://greenkeeper.io/)

Boilerplate/Generator/Starter Project for building RESTful APIs and microservices using Node.js, Express and MongoDB

## Features

 - No transpilers, just vanilla javascript
 - ES2017 latest features like Async/Await
 - CORS enabled
 - Uses [yarn](https://yarnpkg.com)
 - Express + MongoDB ([Mongoose](http://mongoosejs.com/))
 - Consistent coding styles with [editorconfig](http://editorconfig.org)
 - [Docker](https://www.docker.com/) support
 - Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
 - Request validation with [joi](https://github.com/hapijs/joi)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Linting with [eslint](http://eslint.org)
 - Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
 - Code coverage with [istanbul](https://istanbul.js.org) and [coveralls](https://coveralls.io)
 - Git hooks with [husky](https://github.com/typicode/husky)
 - Logging with [morgan](https://github.com/expressjs/morgan)
 - Authentication and Authorization with [passport](http://passportjs.org)
 - API documentation geratorion with [apidoc](http://apidocjs.com)
 - Continuous integration support with [travisCI](https://travis-ci.org)
 - Monitoring with [pm2](https://github.com/Unitech/pm2)

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Clone the repo and make it yours:

```bash
git clone --depth 1 https://github.com/danielfsousa/express-rest-es2017-boilerplate
cd express-rest-es2017-boilerplate
rm -rf .git
```

Install dependencies:

```bash
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Docker

```bash
# run container locally
yarn docker:dev
or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# run container in production
yarn docker:prod
or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# run tests
yarn docker:test
or
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

## Deploy

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Replace my Docker username with yours:

```bash
nano deploy.sh
```

Run deploy script:

```bash
yarn deploy
or
sh ./deploy.sh
```

## Inspirations

 - [KunalKapadia/express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api)
 - [diegohaz/rest](https://github.com/diegohaz/rest)

## License

[MIT License](README.md) - [Daniel Sousa](https://github.com/danielfsousa)
