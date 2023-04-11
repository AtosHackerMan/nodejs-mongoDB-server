const User = require('../dataBase/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
    const refreshToken = cookies?.jwt
    if (!refreshToken) return res.sendStatus(401)

    const findUser = await User.findOne({refreshToken: refreshToken}).exec()
    if (!findUser) return res.status(403)
    
    // Evaluate JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || findUser.username !== decoded.username) return sendStatus(403)
            const roles = Object.values(findUser.roles)
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
            res.json({accessToken})
        }
    )
}

module.exports = handleRefreshToken