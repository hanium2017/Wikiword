const express = require('express');
const parseString = require('xml2js').parseString;
const request = require('request');
const bodyParser = require('body-parser');
const CORS = require('cors')();
const app = express();
const api_key = '4c7de81329d8a421ad409c22fa13950d';

app.use(CORS);
app.use(bodyParser.urlencoded({extended:false}))
app.use('/dbpia', function(req, res) {

  // req.body.searchWord  -> 검색어
  // req.body.pagenumber  -> 더보기 누를때 마다 페이지 하나씩 올라감

  let url = 'http://api.dbpia.co.kr/v1/search/search.xml?target=se&key=' +
             api_key + '&sorttype=2&sortorder=desc&pagecount=5&pyear=1&searchall='
             + encodeURI(req.query.search) + '&pagenumber=' + req.query.pageNum;

  request(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      res.send(JSON.stringify(analyzeXML(body)));
    }
  });

})

module.exports = app;
// app.listen(11000, () => { console.log('DBpia JSON listening on port 11000!'); });

function analyzeXML(xml) {
  var json_data = [];
  parseString(xml, function(err, obj) {
    if (err) {
      console.log(err);
      return;
    }

    var items = obj.root.result[0].items[0].item;

    for(var index in items){
      var item = items[index];
      var object = {}
      object.title = item.title[0].replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
      object.authors = item.authors;
      object.name = item.name;
      object.publisher = item.publisher
      json_data.push(object);
    }

  });
  return json_data;
}
