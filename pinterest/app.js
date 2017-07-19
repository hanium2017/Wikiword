const client = require('cheerio-httpcli');
const express = require('express');
const cors = require('cors')();
const bodyParser = require('body-parser');
const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({extended: false}));
app.get('/pinterest', (request, response) => {

  let url = "https://www.pinterest.co.kr/search/pins/?q="+encodeURIComponent(request.query.search);
  client.fetch(url, {}, function(err, $, res){

    const json_items = [];
    let jQuery = $, elementArray = jQuery("div.GrowthUnauthPinImage > a > img");

    if(elementArray.length == 0){
      json_items.push({'message' : '이미지를 찾을 수 없습니다.' });
    } else{
      elementArray.each(function(idx){
        const object = {};
        let imgTag = jQuery(this);
        // object.link = 'https://www.pinterest.co.kr' + $(this).attr('href');
        object.image_url = imgTag.attr('src');
        object.text = imgTag.attr('alt');
        json_items.push(object);
      });
    }

    // 최대 10개 까지 가능함, 크롤러에 대한 엑세스 제한이 있음
    response.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    response.end(JSON.stringify(json_items));
  });
});

exports.app = app;
