require('@tensorflow/tfjs-node');
const faceapi = require('@vladmandic/face-api');
const { Canvas, Image, ImageData, loadImage } = require('canvas');

class FaceApi {

    constructor() {
        const { network, options } = this.getFaceDetector(process.env.FACEAPI_NETWORK);

        this.network = network;
        this.options = options;
    }

    async process(file) {

        try {

            await this.network.loadFromDisk(`${__dirname}/models`);

            faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

            const image = await loadImage(file.data);
            const detections = await faceapi.detectAllFaces(image, this.options);

            detections.map((detection) => {
                detection._box._x -= 25;
                detection._box._y -= 75;
                detection._box._width += 50;
                detection._box._height += 100;
            });

            return await faceapi.extractFaces(image, detections);

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return [];
    }

    getFaceDetector(networkName) {

        switch (networkName) {

            case 'SsdMobilenetv1':
                return {
                    network: faceapi.nets.ssdMobilenetv1,
                    options: new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })
                };

            case 'TinyFaceDetector':
                return {
                    network: faceapi.nets.tinyFaceDetector,
                    options: new faceapi.TinyFaceDetectorOptions({ inputSize: 1024, scoreThreshold: 0.5 })
                };

            default:
                return null;
        }
    }
}

module.exports = FaceApi;