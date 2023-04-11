const { loggerEvent } = require('./loggerEvent')
const path = require('path')

const errorHandler = (err, req, res, next) => {
    loggerEvent(`${err.name}\t${err.message}`, path.join(__dirname, '..', 'public', 'text', 'errorLogs.txt'))
    console.error(err.stack)
    res.status(500).send(err.message)
}

module.exports = errorHandler