/**
 * @module Database
 *
 */
/**
 * @typedef {Object} ConDetails Defines database connection details object.
 * @property {string} host Database host
 * @property {int} port Database port
 * @property {string} user Database username
 * @property {string} password Database password
 * @property {string} dbName Database name
 */
const util = require('util')
const dbClient = require('mongodb').MongoClient;
const conOptions = {useNewUrlParser: true, useUnifiedTopology: true} // To avoid mongo client deprecation alerts
const mongoose = require('mongoose')

/**
 * @const {ConDetails} conDetails Default database connection configuration object. Holds info about host, port, username etc.
 */
const conDetails = {
  host: process.env.ASKPROJECT_DB_HOST,
  port: process.env.ASKPROJECT_DB_PORT,
  user: process.env.ASKPROJECT_DB_USER,
  password: process.env.ASKPROJECT_DB_PASSWORD,
  dbName: process.env.ASKPROJECT_DB_NAME
}

let dbConnection = null;

Object.keys(conDetails).forEach((k) => {
  if (!conDetails[k]) {
    console.error('Database ' + k + ' not provided! Exit...');
    process.exit(1);
  }
})

const connectionUrl = util.format('mongodb://%s:%s@%s:%s/%s', conDetails.user, conDetails.password, conDetails.host, conDetails.port, conDetails.dbName)

/**
 * Database helper module
 * @type {{connect(): *}}
 */
module.exports = {
  /**
   * Creates database connection
   * In returned promise, passes mongodb.Db object as first parameter.
   * @returns {Promise<Db>}
   */
  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
      dbClient.connect(connectionUrl, conOptions, function (err, client) {
        if (err) {
          return reject(err)
        }

        resolve(dbConnection = client.db(conDetails.dbName))
      });
    })
  }
}
