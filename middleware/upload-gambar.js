const {Storage} = require('@google-cloud/storage');
const multer  = require('multer');
const path = require('path');
const modelGambar = require("../models/gambar");
require('dotenv').config();

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
        cb(new Error('Invalid file type. Allowed types are: ' + allowedMimeTypes.join(', ')), false)
    }
  }

  const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: maxFileSize
    },
    fileFilter
  });

  const handleUpload = (req, res) => {
    try {
        multerUpload.single('file')(req, res, async (err) => {
          if (err instanceof multer.MulterError) {
              return res.status(500).json({ success: false, error: 'Multer error', message: err });
          } else if (err) {
              return res.status(500).json({ success: false, error: 'Unknown error', message: err });
          }
  
          if (!req.file) {
              return res.status(400).send({ success: false, message: 'Upload file yang sesuai terlebih dahulu!' });
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
  
              const {nama, keterangan} = req.body;
              console.log(req.user);
              const iduser = req.user.id_user;
      
              await modelGambar.create({
                  link:namaFile, nama, keterangan, iduser
              });
  
              res.status(200).send({
                  success: true,
                  message: 'Uploaded the file successfully: ' + req.file.originalname,
                  url: encodeURI(publicUrl),
              });
          });
  
          blobStream.end(req.file.buffer);
      });      
    } catch (error) {
        console.error(error);
        throw Error(error);
    }
  };

  return { multerUpload, handleUpload };

};

const getListFiles = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    let fileInfos = [];

    files.forEach((file) => {
      if (!file.name.endsWith('/')) {
        fileInfos.push({
          // name: file.name.split('/').pop(),
          name: file.name,
          url: encodeURI(`https://storage.googleapis.com/${bucket.name}/${file.name}`),
          download: file.metadata.mediaLink,
        });
      }
    });

    res.status(200).send(fileInfos);

  } catch (err) {

    console.log(err);
    res.status(500).send({
      message: "Unable to read list of files!",
    });
    
  }
};

const deleteFile = async (fileName) => {
  try {
      // console.log(fileName);
      const file = bucket.file(fileName);
      await file.delete();
      return { success: true, message: `File ${fileName} deleted successfully.` };
  } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
  }
};

module.exports = {uploadFile, getListFiles, deleteFile};