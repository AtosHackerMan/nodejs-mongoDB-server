const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
const PORT = process.env.PORT || 3000
const logEmitter = require('../eventEmitters/index')

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(filePath,
            !contentType.includes('image') ? 'utf-8' : '')
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'contentType': contentType })
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )
    } catch (error) {
        logEmitter.emit('atos-log', `${error.name}\t${error.message}\tServer created succesfully`,path.join(__dirname, '..', 'eventEmitters', 'errorLogs.txt'))
        response.statusCode = 500;
        response.end()
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    logEmitter.emit('atos-log', 'Log emitted succesfully!', path.join(__dirname, '..', 'eventEmitters', 'logFile.txt'))
    logEmitter.emit('atos-log', `${req.url}\t${req.method}\tServer created succesfully`, path.join(__dirname, '..', 'eventEmitters', 'serverLogs.txt'))

    let extension = path.extname(req.url)
    let contentType

    switch (extension) {
        case ".css":
            contentType = "text/css"
            break;
        case ".js":
            contentType = "text/javascript"
            break;
        case ".json":
            contentType = "application/json"
            break;
        case ".img":
            contentType = "image/jpeg"
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".txt":
            contentType = "text/plain"
            break;
        default:
            contentType = "text/html"
            break;
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)
    
    //makes .html not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

    const fileExists = fs.existsSync(filePath)

    if (fileExists) {
        serveFile(filePath, contentType, res)
    } else {
        switch (path.parse(filePath).base) {
            case "old-page.html":
                res.writeHead(301, {Location : 'new-page.html'})
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301, {Location : '/'})
                res.end()
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text.html', res)
                break;
        }
        console.log(path.parse(filePath))
    }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))