var express = require('express');
var router = express.Router();

/* wikiword main page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* 검색 결과 페이지 */
router.get('/result',function(req,res){
  console.log(req.query.query);
  var query = req.query.query;
  res.render('result.html',{data: query});
});

module.exports = router;
