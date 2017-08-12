const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  request = require('request'),
  CORS = require('cors')(),
  youtube = require('./youtube'),
  google_api = require('../common/wikiword').API_KEY.google_api

app.use(CORS)
app.get('/youtube', function (req, res, next) {
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&type=video&videoDefinition=high&q=${encodeURI(req.query.search, 'utf-8')}&key=${google_api}&pageToken=${req.query.pageNum}`

  request(url, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      const requestBody = JSON.parse(body)
      if(requestBody.items.length == 0){
         res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
         res.end(JSON.stringify([{ 'message': '찾는 동영상이 없습니다.' }]))
      } else {
         youtube.analyzeJSON(requestBody, res)
      }
     
    } else {
      console.log('Error = ' + res.status(response.statusCode).end())
    }
  })
})

exports.app = app

// 실제 영상링크 걸기 -> https://www.youtube.com/watch?v=' + video_id
// pageToken에 nextPageToken  또는 prevPageToken 넣으면 된다.
// 맨 처음에는 토큰 값 ''으로 보내고 다음부터 nextpagetoken값이 있으면 그때는 토큰값으로 보낸다.
// 넘겨야 하는 값
// vedioid, nextpagetoken, title, thumbnails링크,
