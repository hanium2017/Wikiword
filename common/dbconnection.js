let myslq = require('mysql');
const dbConfig = {
  host : 'localhost',
  user : 'hanium2017',
  password : '',
  database : 'wikiword'
}

let dbPool = mysql.createPool(dbConfig);
exports.dbPool = dbPool;
