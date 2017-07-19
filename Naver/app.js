const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const CORS = require('cors')();
const app = express();
const naver = require('./naver');
const API_KEY = require('../common/key');

var options = {
  url: null,
  headers: {
    'X-naver-Client-Id': API_KEY.naver_client_id,
    'X-naver-Client-Secret': API_KEY.naver_secret
  }
};

app.use(CORS);
app.use(bodyParser.urlencoded({extended: false}))

/* type에 news or book을 넣으면 거기에 맞는 json을 출력한다. */
app.get('/:type', function(req, res) {

  let type = req.params.type;
  let url = 'https://openapi.naver.com/v1/search/'+ type +'?display=5&query='
  + encodeURI(req.query.search, 'utf-8') + '&start=' + req.query.pageNum;

  options.url = url;
  request.get(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(naver.analyzeJSON(body, type));

    } else {
      res.status(response.statusCode).end();
      console.log('Error = ' + response.statusCode);
    }
  });
})


exports.app = app;
