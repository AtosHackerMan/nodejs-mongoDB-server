const User = require('../dataBase/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "error": "User and password are required" })

    const findUser = await User.findOne({username: user}).exec()
    if (!findUser) return res.status(401).json({ "error": "User doesn't exists" })
    
    // Evaluate password
    const match = await bcrypt.compare(pwd, findUser.password)
    if (match) {
        const roles = Object.values(findUser.roles)
        // Create JWTS
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "user": findUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30m'}
        )
        const refreshToken = jwt.sign(
            { "username": findUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        // Saving refreshToken with current user
        findUser.refreshToken = refreshToken
        await findUser.save()

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({ accessToken })
    } else {
        res.status(401).json({"Incorrect password": "Try again"})
    }
}

module.exports = {handleLogin}