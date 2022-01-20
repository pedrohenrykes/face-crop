require('@tensorflow/tfjs-node');
const faceapi = require('@vladmandic/face-api');
const { Canvas, Image, ImageData, loadImage } = require('canvas');

class FaceApi {

    constructor() {
        // SsdMobilenetv1Options
        this.minConfidence = 0.5
        // TinyFaceDetectorOptions
        this.inputSize = 408
        this.scoreThreshold = 0.5
    }

    async process(file) {

        try {

            await faceapi.nets.ssdMobilenetv1.loadFromDisk(`${__dirname}/models`);

            faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

            const image = await loadImage(file.data);
            const faceDetectionOptions = await this.getFaceDetectorOptions(faceapi.nets.ssdMobilenetv1);
            const detections = await faceapi.detectAllFaces(image, faceDetectionOptions);

            return await faceapi.extractFaces(image, detections);

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return [];
    }

    async getFaceDetectorOptions(net) {
        return net === faceapi.nets.ssdMobilenetv1
          ? new faceapi.SsdMobilenetv1Options({ minConfidence: this.minConfidence })
          : new faceapi.TinyFaceDetectorOptions({ inputSize: this.inputSize, scoreThreshold: this.scoreThreshold })
    }
}

module.exports = FaceApi;