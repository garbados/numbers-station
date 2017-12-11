'use strict'

const EventEmitter = require('events').EventEmitter
const http = require('http')
const { getNumber } = require('./random')

const NUMBER_EVENT = 'number'

module.exports = class NumbersStation {
  static get DEFAULT_PORT () {
    return 3000
  }

  static get DEFAULT_INTERVAL () {
    return 5000
  }

  /**
   * Returns a pseudorandom integer
   * using the host machine's entropy pool.
   * @param  {Number} maximum  Maximum value for random numbers.
   * @return {Number} A pseudorandom integer.
   */
  static getNumber (minimum, maximum) {
    return getNumber(minimum, maximum)
  }

  /**
   * Create a new numbers station.
   * @constructor
   * @param  {Number} maximum  Maximum value for random numbers.
   * @param  {Number} interval Length of intervals in milliseconds.
   */
  constructor ({ minimum = 0, maximum = Number.MAX_SAFE_INTEGER, interval = NumbersStation.DEFAULT_INTERVAL, port = NumbersStation.DEFAULT_PORT }) {
    this.interval = interval
    this.maximum = maximum
    this.minimum = minimum
    this.port = port
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
    return NumbersStation.getNumber(this.minimum, this.maximum)
  }

  /**
   * Begin emitting numbers.
   */
  start () {
    if (!this._number) {
      this._number = this.getNumber()
    }
    if (!this._ticker) {
      this._ticker = setInterval(() => {
        this._number = this.getNumber()
        this.emitter.emit(NUMBER_EVENT, this._number)
      }, this.interval)
    }
  }

  /**
   * Stop emitting numbers.
   */
  stop () {
    this._number = undefined
    clearInterval(this._ticker)
    if (this.server.listening) {
      this.server.close()
    }
  }

  /**
   * Start the HTTP server.
   * Starts the ticker if it hasn't been started already.
   * @param  {Number}   port Port to listen on.
   * @param  {Function} cb   Callback executed once server has started.
   */
  listen (port, cb) {
    if (!this._ticker) this.start()
    if (typeof port === 'function') {
      cb = port
      port = this.port
    }
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
