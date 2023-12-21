require('dotenv').config();
require("../models/associations");
const modelUser = require("../models/user");
const modelPostingan = require('../models/postingan')
const modelSuka = require('../models/suka')
const modelKomentar = require('../models/komentar')
const modelKoleksi = require('../models/koleksi')
const modelUmpanBalik = require('../models/umpan_balik')

const like = async (req, res) => {
    try {
        const id_user = req.user.id_user
        const idpostingan = req.params.idpostingan

        const findLike = await modelSuka.findOne({
            where: {
                iduser: id_user,
                idpostingan: idpostingan
            }
        })
        if (findLike) {
            res.status(400).json({
                success: false,
                message: 'You have already liked this post'
            })
        } else {
            const addLike = await modelSuka.create({
                iduser: id_user,
                idpostingan: idpostingan
            })
            if (addLike) {
                res.status(200).json({
                    success: true,
                    message: 'You like this post'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "You can't like this post"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        console.error(error)
    }
}

const comment = async (req, res) => {
    try {
        const id_user = req.user.id_user
        const idpostingan = req.params.idpostingan
        const komentar = req.body.komentar
        if (!komentar) {
            res.status(400).json({
                success: false,
                message: 'Please add your comments'
            })
        } else {
            const addComment = await modelKomentar.create({
                iduser: id_user,
                idpostingan: idpostingan,
                komentar: komentar
            })
            if (addComment) {
                res.status(200).json({
                    success: true,
                    message: 'Your comment has been successfully added'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Your comment was not added successfully'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        console.error(error)
    }
}

const savePostingan = async (req, res) => {
    try {
        function padZero(num) {
            return num.toString().padStart(2, '0');
        }

        const id_user = req.user.id_user
        const idpostingan = req.params.idpostingan
        const date = new Date()
        console.log(date)
        const jam = date.getHours()
        const menit = date.getMinutes()
        const detik = date.getSeconds()
        const tahun = date.getFullYear()
        const bulan = padZero(date.getMonth() + 1);
        const hari = padZero(date.getDate());
        const waktu = `${tahun}-${bulan}-${hari} ${jam}:${menit}:${detik}`

        const findKoleksi = await modelKoleksi.findOne({
            where: {
                iduser: id_user,
                idpostingan: idpostingan
            }
        })
        if (findKoleksi) {
            res.status(400).json({
                success: false,
                message: 'You have already saved this post'
            })
        } else {
            const addKoleksi = await modelKoleksi.create({
                iduser: id_user,
                idpostingan: idpostingan,
                waktu: waktu
            })
            if (addKoleksi) {
                res.status(200).json({
                    success: true,
                    message: 'Post saved successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Post was not saved successfully'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        console.error(error)
    }
}

const feedback = async (req,res) => {
    try {
        const id_user = req.user.id_user
        const idpostingan = req.params.idpostingan
        const teks= req.body.teks
        const jenis = req.body.jenis
        const status = req.body.status

        if (!status || !jenis || !teks) {
            res.status(400).json({
                success: false,
                message: 'Please complete your input'
            })
        } else {
            const addFeddback = await modelUmpanBalik.create({
                iduser: id_user,
                idpostingan: idpostingan,
                teks: teks,
                jenis: jenis,
                status: status
            })
            if (addFeddback) {
                res.status(200).json({
                    success: true,
                    message: 'Data added successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data was not added successfully'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        console.error(error)
    }
}

module.exports = {
    like,
    comment,
    savePostingan,
    feedback
}