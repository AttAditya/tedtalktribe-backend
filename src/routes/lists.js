const express = require('express');
const listsController = require('../controllers/lists');

const listsRouter = express.Router();

listsRouter.get("/", listsController.getLatest);
listsRouter.get("/:tag", listsController.getTagged);

module.exports = listsRouter;