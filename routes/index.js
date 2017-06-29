var express = require('express');
var router = express.Router();
var app = express();
var CLIENT_ID = 'OtHO5WKtYeTypxuKxi7a';
var CLIENT_SECRET = 'Wz7sJF6cH_';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/test',function(req,res){
  res.render('result.html');
});

router.get('/search',function(req, res){
  console.log('call search');
  console.log(req.query.query);
  var Query = req.query.query;
  var api_url = 'https://openapi.naver.com/v1/search/news?start=1&display=10&query='
                + encodeURI(Query);
  var request = require('request');
  var options = {
    url: api_url,
    headers: {'X-naver-Client-Id':CLIENT_ID, 'X-naver-Client-Secret': CLIENT_SECRET},

  };

  request.get(options, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    }else{
      res.status(response.statusCode).end();
      console.log('Error = '+response.statusCode);
    }

  });

});

router.get('/search2',function(req,res){
  console.log(req.query.query);
  var query = req.query.query;
  res.render('result.html',{data: query});


});

module.exports = router;
