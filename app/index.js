// Import modules
const app = require('express')();
const mongo = require('mongodb').MongoClient;
const redis = require('redis');
// Env variables
const port = process.env.PORT;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDatabase = process.env.MONGO_DATABASE;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

app.get('/',
    // Set Redis version
    (req, res, next) => {
        const client = redis.createClient(redisPort, redisHost);
        client.on('ready', () => {
            req.redisVersion = client.server_info.redis_version;
            client.quit();
            next();
        });
        client.on('error', err => {
            console.error('Error in connecting to Redis');
            client.quit();
            next(err);
        });
    },
    // Set MongoDB version
    (req, res, next) => {
        mongo.connect(
            `mongodb://${mongoHost}:${mongoPort}`,
            { useNewUrlParser: true },
            function(err, client) {
                if (err) {
                    console.error('Error in connecting to Mongo database');
                    client.close();
                    return next(err);
                }
                client.db(mongoDatabase).admin().serverStatus((err, info) => {
                    req.mongoVersion = info.version;
                    client.close();
                    next();
                });
          });
    },
    // Show the welcome page
    (req, res) => res.send(`
        <h1>Welcome!</h1>
        <p>Services that are running:</p>
        <p><b>MongoDB: </b><span>${req.mongoVersion}</span></p>
        <p><b>Redis: </b><span>${req.redisVersion}</span></p>
    `),
    // Default error handler
    (err, req, res, next) => {
        const error = (new Error(err));
        console.error(error.stack);
        // This is only for demonstration purposes. Not print error' details on the client side in production!
        res.status(500).send(`
            <h1>Something broke! :(</h1>
            <p><b>Code: </b><span>${error.code}</span></p>
            <p><b>Message: </b><span>${error.message}</span></p>
            <pre>${error.stack.slice(7)}</pre>
        `);
    }
)

if (process.env.NODE_ENV = 'test') {
    module.exports = app;
} else {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}