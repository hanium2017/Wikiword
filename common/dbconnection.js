'use strict';
const MYSQL = require('mysql'),
	  DB_INFO = require('./wikiword.json').DB_INFO;
	  
const dbConfig = {
  host : DB_INFO.host,
  port : DB_INFO.port,
  user : DB_INFO.user,
  password : DB_INFO.password,
  database : DB_INFO.database
}

let dbPool = MYSQL.createPool(dbConfig);
exports.dbPool = dbPool;
