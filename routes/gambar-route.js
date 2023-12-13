const router = require("express").Router();
const gambarController = require("../controllers/gambar-controller");
const verifyToken = require("../middleware/authentication")

router.route("/")
    .get(verifyToken, gambarController.list)
    .post(verifyToken ,gambarController.upload);
    
router.route("/:idgambar")
    .delete(verifyToken, gambarController.hapus);

module.exports = router;
