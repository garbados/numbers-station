/**
 * Port of joepie91/node-random-number-csprng
 * that uses synchronous functions instead,
 * since they're built-in and why not.
 *
 * src: https://github.com/joepie91/node-random-number-csprng/blob/master/lib/index.js
 */

const crypto = require('crypto')

function calculateParameters (range) {
  var bits = 0
  var bytes = 0
  while (range > 0) {
    if ((bits % 8) === 0) {
      bytes += 1
    }
    bits += 1
    range = range >>> 1
  }
  return { bits, bytes }
}

function getNumber (minimum = 0, maximum = Number.MAX_SAFE_INTEGER) {
  const range = Math.abs(maximum - minimum)
  const params = calculateParameters(range)
  const randomBytes = crypto.randomBytes(params.bytes)
  var randomValue = 0
  for (var i = 0; i < params.bytes; i++) {
    randomValue |= randomBytes[i] << 8 * i
  }
  if ((randomValue >= minimum) && (randomValue <= maximum)) {
    return randomValue
  } else {
    return getNumber(minimum, maximum)
  }
}

module.exports = { calculateParameters, getNumber }
