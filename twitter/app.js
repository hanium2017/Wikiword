const express = require('express'),
  request = require('request'),
  bodyParser = require('body-parser'),
  cors = require('cors')(),
  app = express(),
  API_KEY = require('../common/wikiword').API_KEY,
  Twitter = require('node-twitter')

var twitterSearchClient = new Twitter.SearchClient(
    API_KEY.twitter_consumer_key,
    API_KEY.twitter_consumer_secret,
    API_KEY.twitter_access_token_key,
    API_KEY.twitter_access_token_secret
)

app.use(cors)
app.use(bodyParser.urlencoded({extended: false}))

app.get('/twitter', (req, res) => {
  twitterSearchClient.search({'q': req.query.search}, (error, result) => {
    const JSONArray = [],
      items = result.statuses

    if (items.length === 0) {
      JSONArray.push({'message': '찾는 내용이 없습니다.'})
    } else {
      for (let item of items) {
        if (item != undefined) {
          const object = {}
          object.pubDate = item.created_at
          object.text = item.text
          object.url = (item.entities.hasOwnProperty('media')) ? item.entities.media[0].url : '# onclick=return false'
          object.name = item.user.name
          object.profile_image_url = item.user.profile_image_url
          JSONArray.push(object)
        }
      }
    }
    res.send(JSON.stringify(JSONArray))
  })
})

exports.app = app
