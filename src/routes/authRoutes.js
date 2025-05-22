const express=require("express")
const router=express.Router();
const authController=require('../controllers/authController');
const authenticateToken = require("../middlewares/auth.middleware");
const { upload } = require('../config/cloudinary'); // ✅ Thêm dòng này

// router.get('/',userController.getAllUsers);
router.post('/register',authController.createUser)
router.post('/login',authController.login)
router.get('/profile',authenticateToken,authController.getProfile)
router.post('/upload-avatar', authenticateToken, upload.single('avatar'), authController.uploadAvatar);
module.exports = router;