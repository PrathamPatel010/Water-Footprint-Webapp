const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    path: {
        type: String,
    },
    originalName: {
        type: String,
    },
    fileSize: {
        type: String,
    },
    objectName: {
        type: String,
    },
});

module.exports = mongoose.model('File', FileSchema);