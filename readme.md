# numbers-station

[![Greenkeeper badge](https://badges.greenkeeper.io/garbados/numbers-station.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/garbados/numbers-station.svg?branch=master)](https://travis-ci.org/garbados/numbers-station)
[![Coverage Status](https://coveralls.io/repos/github/garbados/numbers-station/badge.svg?branch=master)](https://coveralls.io/github/garbados/numbers-station?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

An HTTP server for generating a pseudorandom series of numbers. Useful for running a [numbers station](https://en.wikipedia.org/wiki/Numbers_station).

The server broadcasts a single stream of numbers. Clients requesting the current number at the same time will receive the same number. For example, you could use a numbers station like this in identity challenges by requiring an untrusted individual to demonstrate they are following the same feed. By using a low modulo value, you can generate streams of numbers with a convenient upper bound.

Unlike shortwave numbers stations, an HTTP server can be hidden from the pubnet and secured behind a firewall, and does not have to compete for a slice of the radio spectrum.

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

numbers-station uses the built-in nodejs [crypto](https://nodejs.org/api/crypto.html) library which draws from the host machine's [entropy pool](https://en.wikipedia.org/wiki/Entropy_(computing)). This process generates bytes which are converted to numbers using bitwise methods derived from [joepie91/node-random-numner-csprng](https://github.com/joepie91/node-random-number-csprng) in an effort to minimize any bias introduced during the transform.

If you notice any problems with this process, or know of ways to improve it, please [file an issue](https://github.com/garbados/numbers-station/issues)!

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
