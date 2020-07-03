const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = mongoose.Schema({
    _id:Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: true,
    },
    documents: [{
        file: {
            type: String
        }
    }],
    start_date: {
        type: Date,
        default: Date.now(),
        required:true
    },
    end_date: {
        type: Date,
        default: Date.now(),
        required:true
    },
    responsible_persons: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})
module.exports = mongoose.model('Project', ProjectSchema);