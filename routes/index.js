var express = require('express');
var router = express.Router();
var app = express();
var CLIENT_ID = 'OtHO5WKtYeTypxuKxi7a';
var CLIENT_SECRET = 'Wz7sJF6cH_';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/search',function(req, res){
  var Query = '아이유';
  var api_url = 'https://openapi.naver.com/v1/search/news?start=2&display=100&query='
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

})

module.exports = router;
