const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    text: {
        type: Text,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
})
module.exports = mongoose.model('Comment', CommentSchema);