const mongoose = require('mongoose');

// import schema
const {
  UserSchema,
} = require('../models/user');

const INIT_ACTION = 'action="initConnection"';
const GET_ACTION = 'action="getConnection"';

const HARD_TIMEOUT = 720000;
const SOFT_TIMEOUT = 660000;

/**
 * Initialize an open connection to database.
 *
 * @private
 */
async function initConnection() {
  // setup database connection
  const startDbTime = new Date().getTime();
  console.log(`${INIT_ACTION} message="creating new database connection"`);

  const connection = await mongoose.connect(process.env.mongodb_uri, {
    poolSize: 5,
    replicaSet: process.env.mongodb_replicaSet,
    ssl: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    keepAlive: HARD_TIMEOUT,
    autoReconnect: true,
    socketTimeoutMS: HARD_TIMEOUT,
    authSource: 'admin',
    useNewUrlParser: true,
  });

  const endDbTime = new Date().getTime();
  console.log(`${INIT_ACTION} message="mongoose default connection is open" runtime=${endDbTime - startDbTime}`);

  // initialize models
  mongoose.model('users', UserSchema, 'users');

  return connection;
}

/**
 * Setup mongoose listener and model for new database connection.
 *
 * @private
 */
function setupConnection() {
  mongoose.connection.on('connected', () => {
    console.log(`${INIT_ACTION} message="mongoose default connection is open"`);
  });

  mongoose.connection.on('error', (err) => {
    console.log(`${INIT_ACTION} message="mongoose default connection has occured ${err} error"`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(`${INIT_ACTION} message="mongoose default connection is disconnected"`);
  });

  mongoose.connection.on('reconnected', () => {
    console.log(`${INIT_ACTION} message="mongoose default connection is reconnected"`);
  });

  mongoose.connection.on('timeout', async () => {
    console.log(`${INIT_ACTION} message="mongoose default connection timeout"`);
  });

  mongoose.connection.on('close', () => {
    console.log(`${INIT_ACTION} message="mongoose connection is close"`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(`${INIT_ACTION} message="mongoose default connection is disconnected due to application termination"`);
      process.exit(0);
    });
  });
}

/**
 * Returns new date time if the startDbTime is due to expire.
 *
 * @param {string} startDbTime
 *
 * @public
 */
function getDbTime(startDbTime) {
  const currentDbTime = new Date().getTime();
  if ((currentDbTime - startDbTime) >= SOFT_TIMEOUT) {
    return new Date().getTime();
  }

  return startDbTime;
}

/**
 * Return database connection.
 *
 * @param {object} db
 * @param {string} startDbTime
 *
 * @public
 */
async function getConnection(db, startDbTime) {
  const currentDbTime = new Date().getTime();

  if (db === null) {
    const connection = await initConnection();
    setupConnection();

    return connection;
  }

  if ((currentDbTime - startDbTime) >= SOFT_TIMEOUT) {
    console.log(`${GET_ACTION} message="restart connection"`);
    await mongoose.connection.close();
    return initConnection();
  }

  console.log(`${GET_ACTION} connection="${mongoose.connection.readyState}"`);

  return mongoose.connection;
}

module.exports = {
  initConnection,
  getConnection,
  getDbTime,
};
