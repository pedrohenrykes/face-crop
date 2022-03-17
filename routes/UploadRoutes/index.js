const { Router } = require('express');
const router = Router({ mergeParams: true });
const UploadController = require('../../src/Controllers/UploadController');

router.post('/upload', (req, res) => new UploadController().upload(req, res));

module.exports = router;