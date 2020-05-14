/**
 * @module App
 * @description Main app entry point. Creates express server and database connection, validates configuration and passes
 * control to specific micro service handler.
 */
require('dotenv').config()
const express = require('express')
const dbClient = require('./misc/database')
const promiseRetry = require('promise-retry')
var cors = require('cors')
var bodyParser = require( 'body-parser' )

require('./services/auth/pass.js')

/**
 * Defines allowed/possible micro services running with this app
 * @type {{tickets: *, auth: *}}
 */
const availableServices = {
  tickets: require('./services/tickets/index.js'),
  auth: require('./services/auth/index.js')
}

if (!process.env.ASKPROJECT_RUNNING_SERVICE || !Object.keys(availableServices).includes(process.env.ASKPROJECT_RUNNING_SERVICE)) {
  console.error("Service to run not provided in environmental variable or it's incorrect! Exit...");
  process.exit(1)
}

promiseRetry(function (retry, number) {
  /** @var {mongodb.Db} db MongoDB database connection object */
  return dbClient.connect().catch((err) => {
    console.log('Database connection failed. Attempt number ' + number + '. Retrying again...')
    retry(err);
  })
}).then((db) => {
  console.log('Database connection successful!');
  const server = express()
  const port = process.env.ASKPROJECT_APP_PORT || 80
  server.use(cors())
  server.use(express.json())
  // const auth = require('./services/auth/index.js')
  // server.use('/auth', auth);
  server.use(bodyParser.urlencoded({ extended: true}))
  server.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });
  availableServices[process.env.ASKPROJECT_RUNNING_SERVICE].bind(server, db);
  server.listen(port, () => console.log(`App listening on port ${port}!`))
}, (err) => {
  console.log('Can\'t connect to database after 10 retries! Exit now...');
  exit(2);
});