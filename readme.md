# numbers-station

[![Build Status](https://travis-ci.org/garbados/numbers-station.svg?branch=master)](https://travis-ci.org/garbados/numbers-station)
[![Coverage Status](https://coveralls.io/repos/github/garbados/numbers-station/badge.svg?branch=master)](https://coveralls.io/github/garbados/numbers-station?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

An HTTP server for generating a pseudorandom series of numbers. Useful for running a [numbers station](https://en.wikipedia.org/wiki/Numbers_station).

## Installation & Usage

Install with [npm](https://www.npmjs.com/):

```
npm i -g numbers-station
```

Or get the source code with [git](https://git-scm.com/):

```
git clone https://github.com/garbados/numbers-station
cd numbers-station
npm i
npm link
```

Now run `numbers-station` to start the server, or `numbers-station --help` for usage information.

Once you've started the server, you can watch its output with a command like this to get new numbers periodically:

```
while sleep 5; do curl $SERVER; done
```

Where `$SERVER` is the URL of the numbers station.

## About these random numbers

numbers-station uses the built-in nodejs [crypto](https://nodejs.org/api/crypto.html) library which draws from the host machine's [entropy pool](https://en.wikipedia.org/wiki/Entropy_(computing)).

## Testing

Once you've downloaded the source, you can run the test suite with `npm test`:

```
git clone https://github.com/garbados/numbers-station
cd numbers-station
npm i
npm test
```

## License

[GPL-3.0](./LICENSE)
