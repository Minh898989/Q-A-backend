const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/history/:userId/:friendId', messageController.getChatHistory);

router.post(
  '/send',
  upload.single('file'),
  (req, res, next) => {
    const file = req.file;
    if (file) {
      const type = file.mimetype.startsWith('image/') ? 'image' : 'file';
      req.fileType = type;
    }
    next();
  },
  messageController.sendMessage
);

module.exports = router;
