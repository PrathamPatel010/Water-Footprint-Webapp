// dependencies
require('dotenv').config();
const express = require('express');
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