const express = require('express');
const parseString = require('xml2js').parseString;
const request = require('request');
const bodyParser = require('body-parser');
const CORS = require('cors')();
const app = express();
const API_KEY = require('../common/key');

app.use(CORS);
app.use(bodyParser.urlencoded({extended: false}))
app.use('/dbpia', function(req, res) {

  let url = 'http://api.dbpia.co.kr/v1/search/search.xml?target=se&key=' + API_KEY.dbpia_api + '&sorttype=2&sortorder=desc&pagecount=5&pyear=1&searchall=' + encodeURI(req.query.search) + '&pagenumber=' + req.query.pageNum;

  request(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(JSON.stringify(analyzeXML(body)));
    }
  });

})

exports.app = app;

function analyzeXML(xml) {
  var json_data = [];

  parseString(xml, function(err, obj) {

    if(obj.hasOwnProperty('error')){
      json_data.push({"message":"찾을려는 자료가 없습니다."});
    } else {
      var items = obj.root.result[0].items[0].item;
      for (var index in items) {
        var item = items[index];
        var object = {}
        object.title = item.title[0].replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        // object.authors = item.authors;
        object.pages = item.pages[0];
        object.pubdate = item.issue[0].yymm[0]
        object.link_url = item.link_url;
        object.publisher = item.publisher
        json_data.push(object);
      }
    }
  });

  return json_data;
}
