const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    zip:{
        type:Number
    },
})
module.exports = mongoose.model('City', CitySchema);