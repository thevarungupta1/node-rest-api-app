const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({
            error: true,
            message: 'no token provided, authorization denied'
        })
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
            if(err){
                return res.status(401).json({
                    error: true,
                    message: 'token is not valid, authorization denied'
                })
            }
            req.user = user;
            next();
        })
    }catch(err){
        res.status(400).json({
            error: true,
            message: 'token is not valid, authorization denied'
        })
    }
}
module.exports = auth;  