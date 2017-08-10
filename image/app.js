const client = require('cheerio-httpcli'),
    urlType = require('url'),
    express = require('express'),
    cors = require('cors')(),
    bodyParser = require('body-parser'),
    app = express()

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/image', function(request, response) {

    let url = `https://www.google.com/search?q=${encodeURIComponent(request.query.search)}&site=webhp&source=lnms&tbm=isch`;
    let pageNum = request.query.pageNum;
    pageNum = (pageNum > 8) ? 8 : pageNum; // 최고 100까지가 끝이다. 총 80장 받아온다.

    client.fetch(url, {}, function(err, $, res) {

        const jQuery = $,
            JSONArray = [],
            elementArray = jQuery("img.rg_ic.rg_i");

        if (err) { console.log(err); return; }

        let temp = 10 + (10 * pageNum);
        for (var i = temp, max = temp + 10; i < max; i++) {
            const object = {};
            object.src = elementArray[i].attribs['data-src'];
            JSONArray.push(object);
        }
        
        response.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
        response.end(JSON.stringify(JSONArray))
    });

});

exports.app = app
