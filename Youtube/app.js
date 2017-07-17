const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const CORS = require('cors')();
const youtube = require('./youtube');
const API_KEY = require('../common/key');

app.use(CORS);
app.get('/youtube', function(req, res, next) {
  let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet' +
  '&maxResults=5&order=viewCount&type=video&videoDefinition=high' +
  '&q=' + encodeURI(req.query.search, "utf-8") + '&key=' + API_KEY.google_api + '&pageToken=' + req.query.pageNum;
  request(url, function(err, response, body) {

    if (!err && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(JSON.stringify(youtube.analyzeJSON(body)));
    } else {
      res.status(response.statusCode).end();
      console.log('Error = ' + response.statusCode);
    }
  });
});

exports.app = app;


//실제 영상링크 걸기 -> https://www.youtube.com/watch?v=' + video_id
//pageToken에 nextPageToken  또는 prevPageToken 넣으면 된다.
// 맨 처음에는 토큰 값 ''으로 보내고 다음부터 nextpagetoken값이 있으면 그때는 토큰값으로 보낸다.
// 넘겨야 하는 값
// vedioid, nextpagetoken, title, thumbnails링크,
