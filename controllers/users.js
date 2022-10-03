const { User } = require("../mongo")
const bcrypt = require("bcrypt")

async function createUser(req,res) {
    const { email, password } = req.body

    const hashedPassword = await hashPassword(password)

    const user = new User({ email, password: hashedPassword })
        
    user
    .save()
    .then(() => res.status(201).send({message:"Utilisateur enregistré !"}))
    .catch((err) => res.status(409).send({message: "User pas enregistré :" + err}))  
}

function hashPassword(password){
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
}

function logUser(req, res) {
    const email = req.body.email
    const password = req.body.password
}

module.exports = { createUser, logUser }