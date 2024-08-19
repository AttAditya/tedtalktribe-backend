const articlesDB = require('../database/models/article');
// const { ARTICLE_STATUS } = require('../enums');

async function getLatest(req, res) {
    let limit = req.query.limit || 9;

    let articles = await articlesDB.find();

    articles = articles.sort((a, b) => {
        return b.publishedDate - a.publishedDate;
    });

    if (!isNaN(Number(limit))) {
        articles = articles.slice(0, limit);
    }
    
    res.json(articles);
}

async function getTagged(req, res) {
    let tag = req.params.tag;
    let limit = req.query.limit || 6;

    let articles = await articlesDB.find({
        tags: tag
    });

    articles = articles.sort((a, b) => {
        return b.publishedDate - a.publishedDate;
    });

    if (!isNaN(Number(limit))) {
        articles = articles.slice(0, limit);
    }

    res.json(articles);
}

listsController = {
    getLatest,
    getTagged
};

module.exports = listsController;

