const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date },
}, {versionKey: false});

module.exports = mongoose.model('todolist', TodoSchema);