const path = require('path')

const sendIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'webServer', 'views', 'index.html'))
}

const sendNewPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'webServer', 'views', 'new-page.html'))
}

const redirectOldPage = (req, res) => {
    res.redirect(301, '/new-page') //302 by default
}

const routeHandler = (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
}

const sendHello = (req, res) => {
    res.send('Hello, soy una vitamina')
}

const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res, next) => {
    console.log('three')
    res.send('Finished')
}

const sendChain = [one, two, three]

module.exports = {sendIndex, sendNewPage, redirectOldPage, routeHandler, sendHello, sendChain}