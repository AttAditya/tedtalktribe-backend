const articlesDB = require('../database/models/article');
const utils = require('../utils');

const { ARTICLE_STATUS } = require('../enums');

async function getArticle(req, res) {
    let requestedArticle = req.params.id;
    let article = await articlesDB.findOne({ id: requestedArticle });

    if (!article) {
        res.status(404);
        res.json({
            message: 'Article not found'
        });

        return;
    }

    res.json(article);
}

async function createNewArticle(req, res) {
    let articleId = utils.generation.uuid();
    let articleAuthor = "test-author";

    let draftArticle = {
        id: articleId,
        name: `Article-${articleId}`,
        content: 'This is a draft article',
        image: '',
        author: articleAuthor,
        coauthors: [
            articleAuthor
        ],
        status: ARTICLE_STATUS.DRAFT,
        tags: [],
        publishedDate: null,
        lastUpdated: new Date()
    };

    let newArticle = await articlesDB.create(draftArticle);
    res.json(newArticle);
}

async function updateDraft(req, res) {
    let articleId = req.params.id;
    let article = await articlesDB.findOne({ id: articleId });

    if (!article) {
        res.status(404);
        res.json({
            message: 'Article not found'
        });

        return;
    }

    article.name = req.body.name || article.name;
    article.content = req.body.content || article.content;
    article.image = req.body.image || article.image;
    article.coauthors = req.body.coauthors || article.coauthors;
    article.tags = req.body.tags || article.tags;
    article.lastUpdated = new Date();

    let updated = await articlesDB.findOneAndUpdate({ id: articleId }, article);
    res.json(updated);
}

async function publishArticle(req, res) {
    let articleId = req.params.id;
    let article = await articlesDB.findOne({ id: articleId });
    
    if (!article || article.status === ARTICLE_STATUS.DELETED) {
        res.status(404);
        res.json({
            message: 'Article not found'
        });

        return;
    }
    
    article.status = ARTICLE_STATUS.PUBLISHED;
    article.publishedDate = new Date();

    let updated = await articlesDB.findOneAndUpdate({ id: articleId }, article);
    res.json(updated);
}

async function deleteArticle(req, res) {
    let articleId = req.params.id;
    let article = await articlesDB.findOne({ id: articleId });

    if (!article || article.status === ARTICLE_STATUS.DELETED) {
        res.status(404);
        res.json({
            message: 'Article not found'
        });

        return;
    }
    
    article.status = ARTICLE_STATUS.DELETED;
    let updated = await articlesDB.findOneAndUpdate({ id: articleId }, article);
    res.json(updated);
}

let articlesController = {
    getArticle,
    createNewArticle,
    updateDraft,
    publishArticle,
    deleteArticle
};

module.exports = articlesController;