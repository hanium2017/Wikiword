var express = require('express');
var router = express.Router();

// 네이버 뉴스 데이터 route
router.get('/news',function(req, res){

  // 네이버 api
  var CLIENT_ID = '';
  var CLIENT_SECRET = '';

  var Query = req.query.query;
  var api_url = 'https://openapi.naver.com/v1/search/news?start=1&display=10&query=' + encodeURI(Query);
  var request = require('request');
  var options = {
    url: api_url,
    headers: {'X-naver-Client-Id':CLIENT_ID, 'X-naver-Client-Secret': CLIENT_SECRET},
  };

  request.get(options, function(error, response, body){
    if(!error && response.statusCode == 200){
      console.log(body)
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    }else{
      res.status(response.statusCode).end();
      console.log('Error = '+response.statusCode);
    }
  });
});

module.exports = router;
