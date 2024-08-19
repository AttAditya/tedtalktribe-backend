const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    permissions: {
        type: Array,
        required: false
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;