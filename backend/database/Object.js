const mongoose = require('mongoose');

const ObjectSchema = mongoose.Schema({
    itemName: {
        type: String,
    },
    footprint: {
        type: BigInt,
    },
    goodWater: {
        type: BigInt,
    },
    badWater: {
        type: BigInt,
    },
    unit: {
        type: String,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('Object', ObjectSchema);