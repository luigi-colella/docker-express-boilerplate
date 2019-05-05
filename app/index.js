const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT;

app.get('/',
    // Set MongoDB version
    (req, res, next) => {
        const url = 'mongodb://mongo:27017'
        const dbName = 'data'
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function(err, client) {
                if (err) {
                    console.error('Error in connecting to Mongo database');
                    return next(err);
                }
                console.log("Connected successfully to Mongo database");
                client.db(dbName).admin().serverStatus(function(err, info) {
                    req.mongoVersion = info.version;
                    next();
                });
          });
    },
    // Show the welcome page
    (req, res) => res.send(`
        <h1>Welcome!</h1>
        <p>Services that are running:</p>
        <b>MongoDB: </b><span>${req.mongoVersion}</span>
    `),
    // Default error handler
    (err, req, res, next) => {
        const error = (new Error(err));
        console.error(error.stack);
        // This is only for demonstration purposes. Not print error' details on the client side in production!
        res.status(500).send(`
            <h1>Something broke! :(</h1>
            <br>
            <b>Code: </b><span>${error.code}</span>
            <br>
            <b>Message: </b><span>${error.message}</span>
            <br>
            <pre>${error.stack.slice(7)}</pre>
        `);
    }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))