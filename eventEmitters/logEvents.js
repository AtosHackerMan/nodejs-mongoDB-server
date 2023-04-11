//const { format } = require('date-fns')
//const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvent = async (message, file) => {
    //const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const dateTime = new Date()
    //const logItem = `${dateTime}\t${uuid}\t${message}`
    const logItem = `${dateTime}\t${message}\n`
    try {
        await fsPromises.appendFile(file, logItem)
    } catch (error) {
        console.log(error)
    }
}

module.exports = logEvent