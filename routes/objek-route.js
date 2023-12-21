const router = require("express").Router();
const objekController = require("../controllers/objek-controller");
const verifyToken = require("../middleware/authentication")

router.route("/").post(verifyToken, objekController.tambahObjek);

router.route("/fakta/:objek").get(verifyToken, objekController.getFakta);

router.route("/fakta/:idobjek").post(verifyToken, objekController.tambahFakta);;

router.route("/deskripsi/:idobjek").post(verifyToken, objekController.tambahDeskripsiUmum)


module.exports = router;