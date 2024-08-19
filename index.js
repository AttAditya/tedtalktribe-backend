const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

const database = require('./src/database');

const apiRouter = require('./src/routes');
const postwomanRouter = require('./postwoman');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<script>location.replace("/postwoman")</script>');
});

app.use('/api', apiRouter);
app.use('/postwoman', postwomanRouter);

async function main() {
    console.log('Starting server...');

    console.log('Connecting to the database...');
    let connected = await database.connect();

    if (!connected) {
        console.log('Error connecting to the database');
        return;
    } else {
        console.log('Database connected successfully');
    }

    app.listen(PORT, () => {
        console.log('Server running on port 3000');
    });
}

main();