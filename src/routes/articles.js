const express = require('express');
const articlesController = require('../controllers/articles');

const articleRouter = express.Router();

articleRouter.post("/", articlesController.createNewArticle);
articleRouter.get("/:id", articlesController.getArticle);
articleRouter.put("/:id", articlesController.updateDraft);
articleRouter.patch("/:id", articlesController.updateDraft);
articleRouter.post("/:id", articlesController.publishArticle);
articleRouter.delete("/:id", articlesController.deleteArticle);

module.exports = articleRouter;