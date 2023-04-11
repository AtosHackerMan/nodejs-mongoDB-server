const { format } = require('date-fns')
const { v4: uuid, v4 } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const loggerEvent = async (message, file) => {
    const dateTime = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')
    const logItem = `${message}\tTime: ${dateTime}\tUuid: ${uuid()}\n`
    try {
        await fsPromises.appendFile(file, logItem)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req, res, next) => {
    loggerEvent(`url requested: ${req.url}\trequested from: ${req.headers.origin}\tmethod: ${req.method}\t`, path.join(__dirname, '..', 'public', 'text', 'serverLogs.txt'))
    next()
}

module.exports = {logger, loggerEvent}