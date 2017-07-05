const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const CORS = require('cors')();
const API_KEY = require('../common/key');

app.use(CORS);

app.use('/youtube', function(req, res, next) {
  let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet' +
  '&maxResults=5&order=viewCount&type=video&videoDefinition=high' +
  '&q=' + encodeURI(req.query.search, "utf-8") + '&key=' + API_KEY.google_api + '&pageToken=' + req.query.pageNum;
  request(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      res.send(JSON.stringify(analyzeJSON(body)));
    }
  });
});


function analyzeJSON(body){

  var analyze_json = JSON.parse(body);
  var json_data= {}, json_items =[];

  json_data.nextPageToken = analyze_json.nextPageToken;

  var items = analyze_json.items;
  for(var index in items){
    var item = items[index];
    var object = {};
    object.video_id = item.id.videoId;
    object.title = item.snippet.title;
    object.thumbnail = item.snippet.thumbnails.medium.url;
    json_items.push(object);
  }

  json_data.items = json_items;
  return json_data;
}

module.exports = app;


//실제 영상링크 걸기 -> https://www.youtube.com/watch?v=' + video_id
//pageToken에 nextPageToken  또는 prevPageToken 넣으면 된다.
// 맨 처음에는 토큰 값 ''으로 보내고 다음부터 nextpagetoken값이 있으면 그때는 토큰값으로 보낸다.
// 넘겨야 하는 값
// vedioid, nextpagetoken, title, thumbnails링크,
