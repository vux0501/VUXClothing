const cloudinary = require('../config/cloudinary.config');
// const cloudinaryConfig = require('../../config/cloudynary/cloudinary.config.js');

// import UploadedFile from "../models/File.js";

// const { fileTypeFromStream } = require('file-type');

const CloudinaryController = {
    uploadAvatar: async (req, res, next) => {
        // INP: data(base64), type, fileName,
        // OUT: avatar :(link)

        if (!req.body.resultConvertImage) {
            next();
            return;
        }

        try {
            const resultConvertImage = req.body.resultConvertImage;
            const fileType = req.body.fileType;
            const fileName = req.body.fileName;
            const uploadResponse = await cloudinary.cloudinary.uploader.upload(resultConvertImage, {
                folder: 'VUX.clt',
                upload_preset: 'ml_default',
                resource_type: 'raw',
                filename_override: fileName,
                format: fileType,
            });
            req.body.url = uploadResponse.url;
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    },
};

module.exports = CloudinaryController;
