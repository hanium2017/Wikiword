const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors')();
const app = express();
const API_KEY = require('../common/key');
const Twitter = require('node-twitter');

var twitterSearchClient = new Twitter.SearchClient(
    API_KEY.twitter_consumer_key,
    API_KEY.twitter_consumer_secret,
    API_KEY.twitter_access_token_key,
    API_KEY.twitter_access_token_secret
);

app.use(cors);
app.use(bodyParser.urlencoded({extended: false}));

app.get('/twitter', function(req, res) {

  twitterSearchClient.search({'q': req.query.search}, function(error, result) {
      var json_items =[];
      var items = result.statuses;

      if(items.length === 0 ){
        json_items.push({"message":"검색 된 자료가 없습니다."});
      } else {
        for(var index = 0, max = 7; index < max; index++){
          var object = {};
          var item = items[index];
          object.pubDate = item.created_at
          object.text = item.text;
          object.name = item.user.name;
          object.profile_image_url =  item.user.profile_image_url
          json_items.push(object);
        }
      }
      res.send(JSON.stringify(json_items));
  });
});

exports.app = app;
