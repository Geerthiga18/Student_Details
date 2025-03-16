const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    age: { type: Number, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

module.exports = mongoose.model('Student', StudentSchema);
