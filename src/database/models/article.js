const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    coauthors: {
        type: Array,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    publishedDate: {
        type: Date,
        required: false
    },
    lastUpdated: {
        type: Date,
        required: false
    }
});

const Articles = mongoose.model('Article', articleSchema);

module.exports = Articles;