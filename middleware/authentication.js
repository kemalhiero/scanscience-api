const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {    
    try {
        const token = req.get('Authorization').split(' ')[1];
    
        if (!token) {
            res.status(404).json({
                success: false,
                message: 'Session Token Has Expired'
            })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }
};

module.exports = verifyToken;