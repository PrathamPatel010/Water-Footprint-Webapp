// dependencies
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT;
const frontend_base = process.env.frontend_base;
const cors = require('cors');
const corsOption = {
    origin: frontend_base,
    credentials: true,
}
const multer = require('multer');
const upload = multer({ dest: "uploads" });
const { getDb } = require('./database/db');
const File = require('./database/File');
const Object = require('./database/Object');
const API_KEY = process.env.API_KEY;

// app initialization
const app = express();
const startApp = async() => {
    try {
        await getDb();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    } catch (err) {
        console.log(err.message);
    }
}
startApp();

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
    res.send(`<h1>Backend for hackathon project is up & running</h1>`);
});

// file upload route
app.post('/api/upload', upload.single('file'), async(req, res) => {
    try {
        const fileInfo = req.file;

        const FileData = {
            path: fileInfo.path,
            originalName: fileInfo.originalname,
            fileSize: `${(fileInfo.size/1048576).toFixed(2)} MB`,
            objectName: 'Notset',
        };
        const response = await File.create(FileData);
        res.json(response);
    } catch (err) {
        console.log(err.message);
    }
});

app.post('/api/detect', async(req, res) => {
    try {
        const { filePath } = req.body;
        console.log(filePath);
        const response = await axios.post(`https://api.edenai.run/v2/image/object_detection`, {
            providers: 'google',
            fallback_providers: 'amazon',
            response_as_dict: true,
            attributes_as_list: false,
            show_original_response: false,
            file_url: "https://s3no.cashify.in/cashify/store/product//f351e88ed6ff4769834daa58764d0577.jpg?p=es5sq&s=es"
        }, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${API_KEY}`,
                'content-type': 'application/json',
            }
        });
        const dataToBeSend = { status: response.data.google.status, Name: response.data.google.items[0].label }
        res.json(dataToBeSend);
    } catch (err) {
        if (err && err.response && err.response.data && err.response.data.error) {
            console.log(err.response.data.error);
        }
    }
});