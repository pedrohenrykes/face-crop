require('@tensorflow/tfjs-node');
const FaceApi = require('../FaceApi');
const FileSaver = require('../FileSaver');

class PhotoCropper {

    constructor() {
        this.savePath = process.env.CROPPED_IMAGES;
    }

    async crop(file, id, extension) {

        try {

            const extracted = await (new FaceApi).process(file);

            if (extracted.length === 0) {
                throw new Error('No faces detected.');
            }

            let images = [];

            for (const key in extracted) {
                images.push(await (new FileSaver).store(this.savePath, extracted[key].toBuffer('image/jpeg'), {
                    id,
                    name: `_${key}`,
                    extension
                }));
            }

            return images;

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return null;
    }
}

module.exports = PhotoCropper;