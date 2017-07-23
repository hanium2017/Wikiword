const client = require('cheerio-httpcli'),
, request = require('request')
, express = require('express')
, app = express()
, CORS = require('cors')()
, wikipedia = require('./wikipedia');

app.use(CORS);
app.get('/wikipedia', function(req, res) {

  let url = "https://ko.wikipedia.org/wiki/" + encodeURIComponent(req.query.search);
  client.fetch(url, {}, function(err, $, response) {
    let jQuery = $;
    var JSONArray = null;

    if (wikipedia.htmlClassCheck(jQuery)) {
      JSONArray = wikipedia.homonymCrawling(jQuery)
    } else {
      JSONArray = wikipedia.wikiSearchCrawling(jQuery);
    }

    res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    res.end(JSON.stringify(JSONArray));
  });
});

exports.app = app;
