const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const modelUser = require("../models/user");
const modelToken = require("../models/token");
require('dotenv').config()


const register = async (req,res) =>{
try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    if (!name || !email || !password ) {
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
                nama: name, email, password: hashedPass
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

    } catch (err) {
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
                // const id_user = findUser.id_user
                const findPassword = findUser.password;
                const id_user = findUser.id_user;

                bcrypt.compare(password, findPassword, async (err, results) => {
                    if (err || !results) {
                        res.status(400).json({
                            success: false,
                            message: 'Your password is wrong'
                        })
                    } else {
                        const token = jwt.sign({
                                email, id_user
                            },
                            process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: '1w'
                            }
                        );

                        // req.session.id_user = id_user

                        // res.cookie('token', token, {
                        //     httpOnly: true,
                        //     secure: true,
                        //     maxAge: 7 * 24 * 60 * 60 * 1000,
                        // });

                        await modelToken.create({ 
                            token,
                            id_user: findUser.id_user,
                        });

                        res.status(200).json({
                            success: true,
                            message: 'Login Success',
                            token,
                            // id_user: req.session.id_user
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
            message: error
        });
        console.error(error);
    }
}

const logout = async (req,res) =>{
  try {
        // mengambil token dari header Authorization
        const authHeader = req.get('Authorization');
        
        // jika token tidak ada, kembalikan respons error
        if (!authHeader) {
            return res.status(401).json({ succes: false, message: 'Tidak ada token atau sudah logout sebelumnya' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
              return res.status(401).json({ succes: false, message: err });
            }

            const adaToken = await modelToken.findOne({where: {token}})
            if (!adaToken) {
                return res.status(401).json({ succes: false, message: "Tidak ada token atau sudah logout sebelumnya" });
            }
            
            // hapus token dari database
            await modelToken.destroy({ where: {token}});
        
            // kembalikan respons berhasil logout
            res.status(200).json({ success: true, message: 'Logout berhasil' });
        });
        
        // req.session.destroy((err) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             success: false,
        //             message: "Logging out didn't work",
        //         });
        //     }
    
        //     res.clearCookie('sessionID');
        //     return res.status(200).json({
        //         success: true,
        //         message: 'Logout was successful',
        //     });
        // });

    } catch (error) {
        res.status(500).json({ success: false, message: error });
        console.error(error);
    }
}

module.exports = { register, login, logout};
