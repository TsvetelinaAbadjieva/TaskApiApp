const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 255
    },
    middle_name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 255
    },
    address: {
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country'
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: 'City'
        },
        street: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        // required: true,
        // min: 6,
        // max: 1024
    },
    position: {
        type: Schema.Types.ObjectId,
        ref: 'Position'
    },
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user'
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', userSchema);