const tap = require('tap')
const NumbersStation = require('../lib')
const http = require('http')

tap.test('numbers-station', (test) => {
  const ns = new NumbersStation({ interval: 100 })

  // ticker generates random numbers as soon as it starts
  test.equal(ns.number, undefined)
  ns.start()
  test.notEqual(ns.number, undefined)

  // ensure promises are being resolved
  test.equal(typeof ns.number, 'number')

  // ensure numbers obey the minimum, maximum
  var testNumber0
  for (var i = 0; i < 10; i++) {
    testNumber0 = ns.getNumber()
    test.ok(testNumber0 >= ns.minimum)
    test.ok(testNumber0 <= ns.maximum)
  }

  // wait for ticker
  const testNumber1 = ns.number
  setTimeout(() => {
    const testNumber2 = ns.number
    test.notEqual(testNumber1, testNumber2)
    ns.stop()
    test.end()
  }, ns.interval + 20)
})

tap.test('numbers-station.server', (test) => {
  const port = NumbersStation.getNumber(10000, 20000)
  const ns = new NumbersStation({ port })
  ns.listen(() => {
    http.get(`http://localhost:${port}`, (res) => {
      let rawData = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        const number = parseInt(rawData)
        test.ok(number)
        ns.stop()
        test.end()
      })
    })
  })
})
