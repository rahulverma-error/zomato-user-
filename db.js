// db.js
const mysql = require('mysql2');
const config = require('../config/config');

const pool = mysql.createPool(config);

module.exports = pool.promise();