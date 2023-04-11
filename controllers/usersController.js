const User = require('../dataBase/User')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

module.exports = getAllUsers