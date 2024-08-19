const express = require('express');
const apiRouter = express.Router();

const articleRouter = require('./articles');
const listsRouter = require('./lists');

function ping(req, res) {
    res.json({
        message: 'pong',
        time: new Date()
    });
}

apiRouter.get("/", ping);
apiRouter.get("/ping", ping);

apiRouter.use('/articles', articleRouter);
apiRouter.use('/lists', listsRouter);

module.exports = apiRouter;