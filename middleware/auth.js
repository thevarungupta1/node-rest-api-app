const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const header = req.headers['authorization'] || '';
    const [scheme, token] = header.split(' ');

    // Enforce standard Bearer token format (case‑insensitive)
    if (!token || !/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ 
            error: true,
            message: 'Authorization header must be: Bearer <token>' 
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({
                    error: true,
                    message: 'token is not valid, authorization denied'
                })
            }
            req.user = user;
            next();
        })
    } catch (err) {
        res.status(400).json({
            error: true,
            message: 'token is not valid, authorization denied'
        })
    }
}
module.exports = auth;  