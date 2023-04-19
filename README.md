## Features

This bot connect to Uphold public ticker and retrieve the BTC-USD rate every 5
seconds. Each time it retrieve a new rate, the bot must compare it with the first one
and decide if it should alert of an oscillation. All alerts have been saved on database

## Tech

This project uses a number of open source projects to work properly:

- [Node.js (https://nodejs.org/en/)] - Evented I/O for the backend.
- [Typescript (https://www.typescriptlang.org/)] - JavaScript with syntax for types.
- [MongoDB (https://www.mongodb.com/)] - Document database with the scalability and flexibility that you want with the querying and indexing that you need.
- [Jest (https://jestjs.io/)] - Testing framework designed to ensure correctness of any JavaScript codebase.
- [Prettier (https://prettier.io/)] - Opinionated code formatter.
- [Eslint (https://eslint.org/)] - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.
- [Docker (https://www.docker.com/)] - Docker is an open platform for developing, shipping, and running applications.

## Installation

This project requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
```

## Development

Open your favorite Terminal and run these commands.

First step: Check the configuration file
```sh
In the '.env' file, we have all bot settings. Feel free to change them:

MONGOOSE_CONNECTION_STRING=mongodb://localhost:27017/uphold - #Database path 
TIMER=5000 - #Timer to get the ticker milliseconds
TICKER_URL=https://api.uphold.com/v0/ticker/ - #Ticker url
PAIR="BTCUSD,BATUSD" - #Array of currency pairs divided by comma
PRICE_CHANGE_PERCENT=0.01 - #Index for price changes in percentage
```

Second step: Run the project in dev mode

```sh
# server with hot reload
$ npm run dev
```

Third step: Run the test suite

```sh
# run tests
$ npm run test
```

## Building for source (Production)

For production release:

```sh
# build for production
$ npm run build
```

```sh
# run the project in prd mode
$ npm run start
```

## Docker

This project is very easy to run in a Docker container.

By default, the Docker will expose port 3000, so change this within the
Dockerfile if necessary.

```sh
docker-compose up
```

## Improvements

- Create automation pipelines for test validation and deploy via gitlab (gitlab-ci.yml)
- Detailing of unit tests

## License

MIT

**Free Software, Hell Yeah!**
