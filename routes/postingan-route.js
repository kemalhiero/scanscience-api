const router = require("express").Router();
const postinganController = require('../controllers/postingan-controller')
const verifyToken = require("../middleware/authentication")

router.post('/like/:idpostingan', verifyToken, postinganController.like)
router.post('/comment/:idpostingan', verifyToken, postinganController.comment)
router.post('/save/:idpostingan', verifyToken, postinganController.savePostingan)
router.post('/feedback/:idpostingan', verifyToken, postinganController.feedback)

router.get('/', verifyToken, postinganController.beranda);
router.post('/', verifyToken, postinganController.postingGambar);
router.get('/user/:iduser', verifyToken, postinganController.postinganUserLain);

module.exports = router;
