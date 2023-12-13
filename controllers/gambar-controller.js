require('dotenv').config();
const modelGambar = require("../models/gambar");
const { uploadFile, getListFiles, deleteFile } = require('../middleware/upload-gambar');


const { handleUpload } = uploadFile(
        'gambar-user', // nama folder di bucket
        1024 * 1024 * 3,  // maksimal ukuran file, kalau ini brrti 3MB
        ['image/png', 'image/jpg', 'image/jpeg']    //jenis file yang diterima
    );

const upload = async (req, res) => {
    try {
        handleUpload(req, res);
    } catch (err) {
        console.log(err);

        if (err.code == 'LIMIT_FILE_SIZE') {
            return res.status(500).send({
                message: 'File size cannot be larger than 3MB!',
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file}. ${err}`,
        });
    }
};

const list = async (req, res) => {
    try {
        // getListFiles(req, res);
        const data_gambar = await modelGambar.findAll({
            where: { iduser: req.user.id_user }
        });

        const data = data_gambar.map((gambar) => {
			return {
				idgambar: gambar.idgambar,
				link: encodeURI(`https://storage.googleapis.com/${process.env.BUCKET_NAME}/${gambar.link}`),
				nama: gambar.nama,
				keterangan: gambar.keterangan,
				createdAt: gambar.createdAt,
				updatedAt: gambar.updatedAt,
			};
		});

        res.status(200).json({ success: true, count: data.length, data });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err });
    }
};

const hapus = async (req, res) => {
    try {
        const {idgambar} = req.params;

        if (!idgambar) {
            return res.status(401).json({ success: false, message: 'Pilih file terlebih dahulu' });
        }
        // console.log(idgambar)
        
        const gambar = await modelGambar.findByPk(idgambar);
        // console.log(gambar);
        if (!gambar) {
            return res.status(401).json({ success: false, message: 'File yang dimaksud tidak ada' });
        }

        const namaFile = gambar.link.split('/')[1]
        
        deleteFile(gambar.link)
            .then(async result => {
                if (result.success) {
                    console.log(`File berhasil dihapus: ${namaFile}`);
                    await gambar.destroy();
                    return res.status(200).json({ success: true, message: `File berhasil dihapus: ${namaFile}` });
                } else {
                    console.error(result);
                    return res.status(500).json({ success: false, message: `Gagal menghapus file: ${namaFile}. Reason: ${result.message}` });
                }
            })
            .catch(error => {
                console.error(`Gagal menghapus file: ${namaFile}. Reason: ${error.message}`);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err });
    }
};

module.exports = { upload, list, hapus };