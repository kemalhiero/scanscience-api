const router = require("express").Router();
const gambarController = require("../controllers/gambar-controller");

router.route("/")
    .get(gambarController.list)
    .post(gambarController.upload);
    
router.route("/:idgambar")
    .delete(gambarController.hapus)

module.exports = router;
