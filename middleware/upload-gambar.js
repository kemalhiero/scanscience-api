const {Storage} = require('@google-cloud/storage');
const multer  = require('multer');
const path = require('path');
require('dotenv').config()

const serviceKey = path.join(__dirname, '../config/capstone-406803-4f5b547193af.json');

// Creates a client from a Google service account key
const cloudStorage = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.PROJECT_ID,
});

const bucket = cloudStorage.bucket(process.env.BUCKET_NAME);

function uploadFile(namaFolder, maxFileSize, allowedMimeTypes) {

  const fileFilter = (req, file, cb) => {
    if(allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    }else{
        cb(null, false)
    }
  }

  const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: maxFileSize
    },
    fileFilter,
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, namaFolder + '/' + Date.now().toString() + '_' + file.originalname)
    },
  });

  const handleUpload = (req, res) => {
    multerUpload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'Multer error', message: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Unknown error', message: err.message });
        }

        if (!req.file) {
            return res.status(400).send({ message: 'Upload file yang sesuai terlebih dahulu!' });
        }

        const namaFile = namaFolder + '/' + Date.now().toString() + '_' + req.file.originalname
        const blob = bucket.file(namaFile);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on('error', (err) => {
            res.status(500).send({ message: err.message });
        });

        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            res.status(200).send({
                message: 'Uploaded the file successfully: ' + req.file.originalname,
                url: publicUrl,
            });
        });

        blobStream.end(req.file.buffer);
    });
  };

  return { multerUpload, handleUpload };

};

module.exports = {uploadFile};