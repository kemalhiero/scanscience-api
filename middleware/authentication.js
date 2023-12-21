const jwt = require('jsonwebtoken');
const modelToken = require("../models/token");

const verifyToken = (req, res, next) => {    
    try {
        const authHeader = req.get('Authorization');
    
        if (!authHeader) {
            res.status(404).json({
                success: false,
                message: 'Masukkan token terlebih dahulu'
            })
        }

        const token = authHeader.split(' ')[1];
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
        console.error(error)
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }
};

module.exports = verifyToken;