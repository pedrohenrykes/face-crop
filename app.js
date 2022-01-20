require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const port = process.env.SERVER_PORT;
const app = express();

const UploadController = require('./src/Controllers/UploadController');

// allow the use "Cross-Origin Resource Sharing"
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }));

// parse application/json
app.use(parser.json());

// allow files on the requests
app.use(fileUpload());

app.get('/', (req, res) => res.send("I'm working, bitch!"));
app.post('/upload', (req, res) => (new UploadController).upload(req, res));

app.listen(port, () => console.log(`Server running and listen on port ${port}`));
