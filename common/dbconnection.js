'use strict';
const myslq = require('mysql'),
	  DB_INFO = require('./wikiword.json').DB_INFO;
	  
const dbConfig = {
  host : 'localhost',
  user : 'hanium2017',
  password : '',
  database : 'wikiword'
}

let dbPool = mysql.createPool(dbConfig);
exports.dbPool = dbPool;
