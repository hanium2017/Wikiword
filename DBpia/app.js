const express = require('express'),
      request = require('request'),
      bodyParser = require('body-parser'),
      CORS = require('cors')(),
      app = express(),
      dbpia = require('./dbpia'),
      API_KEY = require('../common/key');

app.use(CORS);
app.use(bodyParser.urlencoded({extended: false}))
app.use('/dbpia', function(req, res) {
  let url = 'http://api.dbpia.co.kr/v1/search/search.xml?target=se&key=' + API_KEY.dbpia_api
              + '&sorttype=2&sortorder=desc&pagecount=5&pyear=1&searchall=' + encodeURI(req.query.search)
              + '&pagenumber=' + req.query.pageNum;

  request(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(JSON.stringify(dbpia.analyzeXML(body)));
    } else {
      res.status(response.statusCode).end();
      console.log('Error = ' + response.statusCode);
    }
  });
})

exports.app = app;
