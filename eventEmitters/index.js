const logEvent = require('./logEvents')
const EventEmitter = require('events')

class Emitter extends EventEmitter { }

//Initialize object
const logEmitter = new Emitter()

//Add listener to the log event
logEmitter.on('atos-log', (msg, file) => logEvent(msg, file))

module.exports = logEmitter