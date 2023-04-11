const User = require('../dataBase/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "error": "User and password are required" })

    const duplicate = await User.findOne({username: user}).exec()
    if (duplicate) return res.status(409).json({ "error": "User already exists" }) // conflict
    
    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)

        // Create and store new user
        await User.create({
            "username": user,
            "password": hashedPwd
        })

        res.status(201).json({ "sucess": `user ${user} created successfully`})
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

module.exports = {handleNewUser}