const PhotoCropper = require('../Services/PhotoCropper');
const FileSaver = require('../Services/FileSaver');

class UploadController {

    constructor() {
        this.savePath = process.env.UPLOADED_IMAGES;
    }

    async upload(req, res) {

        try {

            const { file } = req.files;
            const { extension } = req.body;

            if (!file || Object.keys(req.files).length === 0) {
                throw new Error('No file uploaded.');
            }

            const { id } = await (new FileSaver).store(this.savePath, file.data, { extension });

            const images = await (new PhotoCropper).crop(file, id, extension);

            const { file : cropped } = images[0];

            return res.status(200).sendFile(cropped);

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return res.sendStatus(400);
    }
}

module.exports = UploadController;