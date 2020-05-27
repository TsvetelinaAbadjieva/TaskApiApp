const mongoose = require('mongose');
const Schema = mongoose.Schema;

const TaskSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: Text,
        required: true
    },
    due_date: {
        type: Date,
        default: Date.now()
    },
    deadline: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    responsible_persons: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        is_current: {
            type: Boolean,
            default: false
        }
    }],
    departments: [{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    execution_steps: [{
        title: {
            type: String
        },
        description: {
            type: Text
        },
        required_attachment: {
            type: Boolean
        },
        attachments: [{
            file: {
                type: ArrayBuffer
            }
        }],
        executed_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]


}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})