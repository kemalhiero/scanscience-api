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
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const list = async (req, res) => {
    try {
        getListFiles(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: err });
    }
};

const hapus = async (req, res) => {
    try {
        const idgambar = req.params.idgambar;

        console.log(idgambar)
        
        deleteFile("gambar-user/"+idgambar)
            .then(result => {
                if (result.success) {
                    console.log(`File deleted successfully: ${idgambar}`);
                    return res.status(200).json({ success: true, message: `File deleted successfully: ${idgambar}` });
                } else {
                    console.error(result);
                    return res.status(500).json({ success: false, message: `Failed to delete file: ${idgambar}. Reason: ${result.message}` });
                }
            })
            .catch(error => {
                console.error(`Error deleting file: ${idgambar}. Reason: ${error.message}`);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: err });
    }
};

module.exports = { upload, list, hapus };