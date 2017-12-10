const tap = require('tap')
const NumbersStation = require('../lib')

tap.test('numbers-station', (test) => {
  const ns = new NumbersStation(1, 1000, 6)
  // ticker generates random numbers as soon as it starts
  test.equal(ns.number, undefined)
  ns.start()
  test.notEqual(ns.number, undefined)
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
  test.ok(maxNumber < ns.mod)
  // wait for ticker
  const testNumber1 = ns.number
  setTimeout(() => {
    const testNumber2 = ns.number
    test.notEqual(testNumber1, testNumber2)
    ns.stop()
    test.end()
  }, ns.interval + 20)
})
