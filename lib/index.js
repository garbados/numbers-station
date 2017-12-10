'use strict'

const EventEmitter = require('events').EventEmitter
const crypto = require('crypto')
const http = require('http')

const NUMBER_EVENT = 'number'

module.exports = class NumbersStation {
  static get DEFAULT_PORT () {
    return 3000
  }

  static get DEFAULT_BYTES () {
    return 1
  }

  static get DEFAULT_INTERVAL () {
    return 5000
  }

  /**
   * Returns a pseudorandom integer
   * using the host machine's entropy pool.
   * @return {Number} A pseudorandom integer.
   */
  static getNumber (bytes) {
    const randomHex = crypto.randomBytes(bytes).toString('hex')
    return parseInt(randomHex, 16)
  }

  /**
   * Create a new numbers station.
   * @constructor
   * @param  {Number} bytes    Number of random bytes to generate at each interval.
   * @param  {Number} interval Length of intervals in milliseconds.
   * @param  {Number} mod      Modulus operand for applying an upper bound on random numbers.
   */
  constructor (bytes, interval, mod) {
    this.bytes = bytes || NumbersStation.DEFAULT_BYTES
    this.interval = interval || NumbersStation.DEFAULT_INTERVAL
    this.mod = mod
    this.emitter = new EventEmitter()
    this.emitter.on(NUMBER_EVENT, (n) => {
      this._number = n
    })
    this.server = http.createServer((req, res) => {
      res.writeHead(200)
      res.end(this.number.toString() + '\n')
    })
  }

  /**
   * Wrapper around NumbersStation.getNumber
   * that uses the instance's bytes value.
   * Respects the instance's mod value.
   * @return {Number} A pseudorandom integer.
   */
  getNumber () {
    if (this.mod) {
      return NumbersStation.getNumber(this.bytes) % this.mod
    } else {
      return NumbersStation.getNumber(this.bytes)
    }
  }

  /**
   * Begin emitting numbers.
   */
  start () {
    if (!this._number) {
      this._number = this.getNumber()
    }
    this._ticker = setInterval(() => {
      this._number = this.getNumber()
      this.emitter.emit(NUMBER_EVENT, this._number)
    }, this.interval)
  }

  /**
   * Stop emitting numbers.
   */
  stop () {
    this._number = undefined
    clearInterval(this._ticker)
  }

  /**
   * Start the HTTP server.
   * Starts the ticker if it hasn't been started already.
   * @param  {Number}   port Port to listen on.
   * @param  {Function} cb   Callback executed once server has started.
   */
  listen (port, cb) {
    if (!this._ticker) this.start()
    this.server.listen(port, cb)
  }

  /**
   * Return the current number by value.
   * @return {Number} The current number.
   */
  get number () {
    return this._number
  }
}
