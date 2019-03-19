const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    // console.log('auth middleware')

    try {
        const token = req.header('Authorization').replace('Bearer ', '').trim()
        console.log(token)
        console.log(jwt)
        const decoded = jwt.verify(token, 'thisismynewcourse')

       
        console.log("decoded",decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)
        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }

    next();
}

module.exports = auth