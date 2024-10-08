const articlesDB = require('../database/models/article');
const { ARTICLE_STATUS } = require('../enums');

async function getLatest(req, res) {
    let limit = req.query.limit || 9;

    let articles = await articlesDB.find({
        status: ARTICLE_STATUS.PUBLISHED
    });

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
        tags: tag,
        status: ARTICLE_STATUS.PUBLISHED
    });

    articles = articles.sort((a, b) => {
        return b.publishedDate - a.publishedDate;
    });

    if (!isNaN(Number(limit))) {
        articles = articles.slice(0, limit);
    }

    res.json(articles);
}

async function getUserPublished(req, res) {
    let userId = req.params.userId;

    let articles = await articlesDB.find({
        author: userId,
        status: ARTICLE_STATUS.PUBLISHED
    });

    articles = articles.sort((a, b) => {
        return b.publishedDate - a.publishedDate;
    });
    
    res.json(articles);
}

async function getUserDrafts(req, res) {
    let userId = req.params.userId;

    let articles = await articlesDB.find({
        author: userId,
        status: ARTICLE_STATUS.DRAFT
    });

    articles = articles.sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
    });

    res.json(articles);
}

listsController = {
    getLatest,
    getTagged,
    getUserPublished,
    getUserDrafts
};

module.exports = listsController;

