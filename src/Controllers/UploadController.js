const ImageCrop = require('../Services/ImageCrop');
const SaveFile = require('../Services/SaveFile');

class UploadController {

    constructor() {
        this.savePath = process.env.UPLOADED_IMAGES;
    }

    async upload(req, res) {

        try {

            const { image : file } = req.files;

            if (!file || Object.keys(req.files).length === 0) {
                throw new Error('No files uploaded.');
            }

            const fileId = await (new SaveFile).store(this.savePath, file.data);

            (new ImageCrop).crop(file, fileId);

            return res.status(200).send('Upload successfully!');

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return res.sendStatus(400);
    }
}

module.exports = UploadController;