const { uploadFile } = require('../middleware/upload-gambar');

// Import other dependencies or configurations as needed

const { handleUpload } = uploadFile(
        'gambar-user', 
        1024 * 1024 * 3, 
        ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
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

module.exports = { upload };