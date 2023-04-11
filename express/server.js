require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('../config/corsOptions')
const credentials = require('../middleware/credentials')
const PORT = process.env.PORT || 3000
const { logger } = require('../middleware/loggerEvent')
const errorHandler = require('../middleware/errorHandler')
const verifyToken = require('../middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('../config/connectDB')

// Connect to mongoDB
connectDB()

// custom middleware logger
app.use(logger)

// Handle option credentials --> BEFORE CORS!
// Fetch cookie credentials requirement 
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// express middleware used to read content from forms
app.use(express.urlencoded({ extended: false }))

// express middleware used to read json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// express middleware used to read static files
app.use('/', express.static(path.join(__dirname, '..', 'public')))
app.use('/subdir', express.static(path.join(__dirname, '..', 'public')))

// Routes
app.use('/', require('../routes/root'))
app.use('/subdir', require('../routes/subdir'));
app.use('/users', require('../routes/users'))
app.use('/register', require('../routes/register'))
app.use('/login', require('../routes/login'))
app.use('/refresh-token', require('../routes/refreshToken'))
app.use('/logout', require('../routes/logout'))

// Routes that need authorization
app.use(verifyToken)
app.use('/employees', require('../routes/api/employees'))

// 404 handler
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'webServer', 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({
            error: '404 not found'
        })
    } else {
        res.type('txt').send('404 not found')
    }
})

// Error handler
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("connected to mongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})