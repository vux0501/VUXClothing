const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    // folder: 'VUX.clt',
    // allowedFormats: ['jpg', 'png'],
    // filename: function (req, file, cb) {
    //     console.log(req.file);
    //     cb(null, file.originalname);
    // },
    params: {
        folder: (req, file) => 'VUX.clt',
        format: async (req, file) => ['jpg', 'png'], // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});

const uploadCloud = multer({ storage });

module.exports = { uploadCloud, cloudinary };
