const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const CORS = require('cors')();
const app = express();
const API_KEY = require('../common/key');

var options = {
  url: null,
  headers: {
    'X-naver-Client-Id': API_KEY.naver_client_id,
    'X-naver-Client-Secret': API_KEY.naver_sercret
  }
};

app.use(CORS);
app.use(bodyParser.urlencoded({extended: false}))

app.get('/news', function(req, res) {

  console.log(req.query.search);
    console.log(req.query.pageNum);
  let url = 'https://openapi.naver.com/v1/search/news?display=5&query='
  + encodeURI(req.query.search, 'utf-8') + '&start=' + req.query.pageNum;
  options.url = url;

  request.get(options, function(error, response, body) {

    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);

    } else {
      res.status(response.statusCode).end();
      console.log('Error = ' + response.statusCode);
    }
  });
})

module.exports = app;
// app.listen(12000, () => {
//   console.log('Naver Open API listening on port 12000!');
// });
