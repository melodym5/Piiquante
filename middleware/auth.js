const jwt = require("jsonwebtoken")

function authenticateUser(req, res, next) {
    console.log("authenticate user")
    const header = req.header("Authorization")
    if (header == null) return res.status(403).send({message: "Invalid"})
    console.log(header)
    const token = header.split(" ")[1]
    if (token == null) return res.status(403).send ({message: "Token cannot be null"})
    console.log(token)
    console.log(process.env.JWT_PASSWORD)
    jwt.verify(token, process.env.JWT_PASSWORD,(err, decoded)=> {
    if (err) return res.status(403).send({ message: "Invalid token " + err })
    console.log("Token valide")
    next()
    })
}

module.exports = { authenticateUser }