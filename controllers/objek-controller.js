require('dotenv').config();
require("../models/associations");
const modelFakta = require("../models/fakta");
const modelObjek = require("../models/objek");
const modelJenis = require("../models/jenis");
const modelDeskripsi = require("../models/deskripsi_umum_objek");

const getFakta = async (req,res) =>{
    try {
        const {objek} = req.params;

        if (!objek) {
            res.status(404).json({success: false, message: 'pilih objek terlebih dahulu'})
        };

        decodeURI(objek)

        const data_fakta = await modelObjek.findOne({
            where: {
                nama: objek
            },
            include: [modelFakta, modelJenis, modelDeskripsi]
        });

        if (data_fakta) {
            res.status(200).json({ success : true,
                data : {
                    idobjek : data_fakta.idobjek, 
                    nama : data_fakta.nama, 
                    definisi : data_fakta.deskripsi, 
                    referensi : data_fakta.referensi,
                    jenis : data_fakta.jeni.jenis,
                    deskripsi_umum : data_fakta.deskripsi_umum_objeks.map((desk) => ({
                      iddeskripsi : desk.iddeskripsi,
                      judul : desk.judul,
                      isi : desk.deskripsi,
                      createdAt : desk.createdAt,
                      updatedAt : desk.updatedAt,
          
                    })),
                    fakta : data_fakta.fakta.map((fkt) => ({
                      idfakta : fkt.idfakta,
                      judul : fkt.judul,
                      isi : fkt.fakta,
                      createdAt : fkt.createdAt,
                      updatedAt : fkt.updatedAt,
          
                    })),
                    createdAt : data_fakta.createdAt,
                    updatedAt : data_fakta.updatedAt,
                }
            });
        } else {
            res.status(404).json({error:true, message:"Objek tidak ditemukan atau belum didata"})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error
        });
    }
};

const tambahObjek = async (req,res) =>{
    try {
        const {nama, deskripsi, referensi, idjenis} = req.body;

        await modelObjek.create({
            nama, deskripsi, referensi, idjenis
        })

        res.status(200).json({
            success : true,
            message : 'Berhasil tambah objek'
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err
        });
    }
};

const tambahFakta = async (req,res) =>{
    try {
        const {idobjek} = req.params;
        const {judul, isi} = req.body;

        await modelFakta.create({
            idobjek, judul, fakta:isi
        })

        res.status(200).json({
            success : true,
            message : 'Berhasil tambah fakta'
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err
        });
    }
};

const tambahDeskripsiUmum = async (req,res) =>{
    try {
        const {idobjek} = req.params;
        const {judul, deskripsi} = req.body;

        await modelDeskripsi.create({
            judul, deskripsi, idobjek
        });

        res.status(200).json({
            success : true,
            message : 'berhasil tambah'
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err
        });
    }
};


module.exports = {getFakta, tambahObjek, tambahFakta, tambahDeskripsiUmum};
