var express = require('express');
var router = express.Router();
const API_KEY = require('../../common/key');
const fs = require('fs');

/* wikiword main page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});


/* 키값을 브라우저에 표시하지 않기 위해 서버에서 json 파일을 읽어 제공한다.*/
router.post('/keyset', function(req, res, next) {
  fs.readFile("./common/key.json","utf8", function(err, data){
    if (err) throw err;
    res.send(data);
  });
});

router.get('/new_index', function(req, res, next) {
  res.render('new_index.html');
});

/* 검색 결과 페이지 */
router.get('/result',function(req,res){
  res.render('result.html',{data:req.query.query});
});


router.get('/test',function(req,res){
  res.render('test.html');
});

module.exports = router;
