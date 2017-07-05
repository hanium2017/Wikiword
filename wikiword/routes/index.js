var express = require('express');
var router = express.Router();

/* wikiword main page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* 검색 결과 페이지 */
router.get('/result',function(req,res){
  res.render('result.html',{data:req.query.query});
});


router.get('/test',function(req,res){
  res.render('test.html');
});

module.exports = router;
