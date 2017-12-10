const tap = require('tap')
const NumbersStation = require('../lib')

tap.test('numbers-station', (test) => {
  const ns = new NumbersStation()
  test.equal(ns.number, undefined)
  ns.start()
  test.notEqual(ns.number, undefined)
  const testNumber1 = ns.number
  setTimeout(() => {
    const testNumber2 = ns.number
    test.notEqual(testNumber1, testNumber2)
    ns.stop()
    test.end()
  }, ns.interval + 20)
})
