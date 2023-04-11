const verifyRoles = (...acceptedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401)
        const roles = req.roles
        const verify = roles.map(role => acceptedRoles.includes(role)).find(val => val === true)
        if (!verify) return res.sendStatus(401)
        next()
    }
} 

module.exports = verifyRoles