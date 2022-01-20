const FaceApi = require('../FaceApi');
const SaveFile = require('../SaveFile');

class ImageCrop {

    constructor() {
        this.savePath = process.env.CROPED_IMAGES;
    }

    async crop(file, fileId) {

        try {

            const extracted = await (new FaceApi).process(file);

            if (extracted.length === 0) {
                throw new Error('No faces detected.');
            }

            for (const key in extracted) {
                (new SaveFile).store(this.savePath, extracted[key].toBuffer('image/jpeg'), {
                    id: fileId,
                    name: `_${key}`
                });
            }

            return true;

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return false;
    }
}

module.exports = ImageCrop;