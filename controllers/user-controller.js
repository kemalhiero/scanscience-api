const modelUser = require("../models/user");
require('dotenv').config()


const register = async (req,res) =>{
    try {

        res.send("registerr")
        
    } catch (error) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
}

const login = async (req,res) =>{
    try {

        res.send("login")
        
    } catch (error) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
}

const logout = async (req,res) =>{
    try {
        
        res.send("logout")

    } catch (error) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
}

module.exports = {register, login, logout};