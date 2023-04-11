const fs = require('fs')
const path = require('path')

//We write a file
//After that's done we append more text to it
//After that's done we rename it
//After that'S done we read it

fs.writeFile(path.join(__dirname, 'assets', 'hello.txt'), "Hello! I'm Mr Filey, a file created using Node Js.", (err) => {
    if (err) throw err;

    fs.appendFile(path.join(__dirname, 'assets', 'hello.txt'), '\n\nEditor note: Filey killed my family, please help', (err) => {
        if (err) throw err;

        fs.rename(path.join(__dirname, 'assets', 'hello.txt'), path.join(__dirname, 'assets', 'help.txt'), (err) => {
            if (err) throw err;
            
            fs.readFile(path.join(__dirname, 'assets', 'help.txt'), 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data)
            })
    })
    })
})
