const fsPromise = require('fs').promises
const path = require('path')

const createFile = async () => {
    try {
        await fsPromise.unlink(path.join(__dirname, 'assets', 'test.txt'))
        await fsPromise.writeFile(path.join(__dirname, 'assets', 'incompletePromise.txt'), 'This promise is incomplete, sadge')
        await fsPromise.appendFile(path.join(__dirname, 'assets', 'incompletePromise.txt'), '\n\nBut you have completed it for me, thank you stranger')
        await fsPromise.rename(path.join(__dirname, 'assets', 'incompletePromise.txt'), path.join(__dirname, 'assets', 'completePromise.txt'))
        const data = await fsPromise.readFile(path.join(__dirname, 'assets', 'completePromise.txt'), 'utf-8')
        console.log(data)
    } catch (error) {
        throw error
    }
}

createFile()