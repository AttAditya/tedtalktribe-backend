const express = require('express');
const listsController = require('../controllers/lists');

const listsRouter = express.Router();

listsRouter.get("/", listsController.getLatest);
listsRouter.get("/:tag", listsController.getTagged);
listsRouter.get("/user/:userId", listsController.getUserPublished);
listsRouter.get("/user/:userId/drafts", listsController.getUserDrafts);

module.exports = listsRouter;