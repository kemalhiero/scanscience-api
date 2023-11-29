const modelUser = require("../models/user");
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // return res.redirect('/login');
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        next();
    } catch (error) {
        // return res.redirect('/login');
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }
};


const register = async (req,res) =>{
try {
        const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const gender = req.body.gender

    if (!nama || !email || !password || !gender) {
        res.status(400).json({
            success: false,
            message: 'Please complete your account data'
        })
    } else {
        const findEmail = await modelUser.findOne({
            where: {
                email: email
            }
        })

        if (findEmail) {
            res.status(400).json({
                success: false,
                message: 'Email is already in use'
            })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashedPass = bcrypt.hashSync(password, salt)

            const addUser = await modelUser.create({
                nama: nama,
                email: email,
                password: hashedPass,
                gender: gender
            })

            if (addUser) {
                res.status(200).json({
                    success: true,
                    message: 'Account registration successful'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Account registration was unsuccessful'
                })
            }
        }
    }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: err
        });
        console.error(err);
    }
}

const login = async (req,res) =>{
   try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please complete your account data'
            })
        } else {
            const findUser = await modelUser.findOne({
                where: {
                    email: email
                }
            })

            if (findUser) {
                const id_user = findUser.id_user
                const findPassword = findUser.password

                bcrypt.compare(password, findPassword, async (err, results) => {
                    if (err || !results) {
                        res.status(400).json({
                            success: false,
                            message: 'Your password is wrong'
                        })
                    } else {
                        const token = jwt.sign({
                                id_user: id_user,
                            },
                            process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: '1w'
                            }
                        );

                        req.session.id_user = id_user

                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });

                        res.status(200).json({
                            success: true,
                            message: 'Login Success',
                            token: token,
                            id_user: req.session.id_user
                        })

                    }
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Email not found'
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: err
        });
        console.error(err);
    }
}

const logout = async (req,res) =>{
  try {
        
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Logging out didn't work",
                });
            }
    
            res.clearCookie('sessionID');
            return res.status(200).json({
                success: true,
                message: 'Logout was successful',
            });
        });

    } catch (error) {
        res.status(500).json({ success: false, message: err });
        console.error(err);
    }
}

module.exports = {verifyToken, register, login, logout};
