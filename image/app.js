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
            elementArray = jQuery("div.rg_bx.rg_di.rg_el.ivg-i");

        if (elementArray.length == 0) {
            JSONArray.push({ "message": "찾는 이미지가 없습니다." });
        } else {
            let temp = 10 + (10 * pageNum);
            for (var i = temp, max = temp + 10; i < max; i++) {
                let thisElement = elementArray[i]
                if (thisElement) {
                    // 배열이 0개면 더보기 눌러도 밑으로 안 내려가게 이벤트 처리한다.
                    let dataVed = thisElement.attribs['data-ved'];
                    let imageTag = thisElement.children[0].children[0];

                    const object = {}
                    object.href = `https://www.google.com/search?tbs=simg%3Am00&tbnid=${imageTag.attribs['name']}` +
                        `&docid=xngzy75YjYbHbM&tbm=isch&ved=${dataVed}`
                    object.src = imageTag.attribs['data-src'];
                    JSONArray.push(object);
                }

            }
        }

        response.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
        response.end(JSON.stringify(JSONArray))
    });

});

exports.app = app
