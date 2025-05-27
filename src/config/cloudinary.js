
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cấu hình Cloudinary từ biến môi trường
cloudinary.config({
  cloud_name:  'db3n1kswt',
  api_key:  '299293383991286',
  api_secret: 'WaYbfiv0cz909aajjehkItnagvA',
});

// Cấu hình Multer để lưu ảnh lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars', // hoặc tên folder tùy bạn
    allowed_formats: ['jpg', 'jpeg', 'png',],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage });

module.exports = {
  cloudinary,
  upload,
};
