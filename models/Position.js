const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    }
})
module.exports = mongoose.model('Position', PositionSchema);