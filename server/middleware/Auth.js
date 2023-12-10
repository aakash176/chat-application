const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const protect = async(req,res,next) => {
    let token
    console.log(req.headers);
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decode', decode);
            req.user = await User.findById(decode.id).select('-password')
            console.log(req.user);
            next()
        } catch(err){
            res.send("User is not authorized!")
        }
    }
    else{
        res.send("From postman")
    }
}

module.exports = protect