const router = require("express").Router();
const gambarController = require("../controllers/gambar-controller");

router.post("/upload", gambarController.upload);

module.exports = router;
