const tap = require('tap')
const NumbersStation = require('../lib')

tap.test('numbers-station', (test) => {
  const ns = new NumbersStation(100, 1000)

  // ticker generates random numbers as soon as it starts
  test.equal(ns.number, undefined)
  ns.start()
  test.notEqual(ns.number, undefined)

  // ensure promises are being resolved
  test.equal(typeof ns.number, 'number')

  // ensure numbers obey the modulo
  var maxNumber = [
    null,
    null,
    null,
    null,
    null
  ].map(() => {
    return ns.getNumber()
  }).reduce((a, b) => {
    return Math.max(a, b)
  }, 0)
  test.ok(maxNumber < ns.maximum)

  // wait for ticker
  const testNumber1 = ns.number
  setTimeout(() => {
    const testNumber2 = ns.number
    test.notEqual(testNumber1, testNumber2)
    ns.stop()
    test.end()
  }, ns.interval + 20)
})
