const User = require('../dataBase/User')

const handleLogout = async (req, res) => {
    // On client also delete AcessToken
    
    const refreshToken = res.cookies?.jwt
    if (!refreshToken) return res.sendStatus(204);

    // Is refreshToken in DB?
    const findUser = await User.findOne({refreshToken: refreshToken})
    if (!findUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true }) // secure: true
        res.sendStatus(204)
    }

    // Delete refreshToken from DB
    findUser.refreshToken = ""
    await findUser.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

    res.sendStatus(204)
}

module.exports = handleLogout