// This file contains our mongoose connection and db information

const dbconfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbconfig.url;
db.contact = require('./contact.js')(mongoose);

module.exports = db;
