const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name:  'db3n1kswt',
  api_key:  '299293383991286',
  api_secret: 'WaYbfiv0cz909aajjehkItnagvA',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    return {
      folder: isImage ? 'chat_images' : 'chat_files',
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'mp4', 'webm'],
      resource_type: 'auto',
    };
  },
});

const uploadMessageFile = multer({ storage });

module.exports = { cloudinary, uploadMessageFile };
