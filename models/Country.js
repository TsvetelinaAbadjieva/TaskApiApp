const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    code:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Country', CountrySchema);