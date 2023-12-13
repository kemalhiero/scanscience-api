const jwt = require('jsonwebtoken');
const modelToken = require("../models/token");

const verifyToken = (req, res, next) => {    
    try {
        const token = req.get('Authorization').split(' ')[1];
    
        if (!token) {
            res.status(404).json({
                success: false,
                message: 'Masukkan token terlebih dahulu'
            })
        }
        // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // req.user = decoded;

         // verifikasi token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ success: false, message: err });
            }

            const adaToken = await modelToken.findOne({where: {token}})
            if (!adaToken) {
                return res.status(401).json({ success: false, message: "Tidak ada token atau sudah logout sebelumnya" });
            }
            
            req.user = user;
            next();
        });
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }
};

module.exports = verifyToken;