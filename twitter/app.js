const express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    cors = require('cors')(),
    app = express(),
    API_KEY = require('../common/wikiword').API_KEY,
    Twitter = require('twit')

var T = new Twitter({
    consumer_key: API_KEY.twitter_consumer_key,
    consumer_secret: API_KEY.twitter_consumer_secret,
    access_token: API_KEY.twitter_access_token_key,
    access_token_secret: API_KEY.twitter_access_token_secret
})

app.use(cors)
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/twitter', (req, res) => {
    
    let count = req.query.pageNum * 5;

    if (count > 50) {
        res.send(JSON.stringify([{ "message": "모두 검색 했습니다." }]));
    } else {

        T.get('search/tweets', { q: req.query.search, count: count }, function(err, data, response) {
           
            const JSONArray = [], items = data.statuses
            if (items.length === 0) {
                JSONArray.push({ 'message': '찾는 내용이 없습니다.' })
            } else {

                let temp = count - 5;
                for (var i = temp, max = count; i < count; i++) {
                    let item = items[i];
                    if (item != undefined) {
                        const object = {}
                        object.pubDate = item.created_at
                        object.text = item.text
                        object.url = (item.entities.hasOwnProperty('media')) ? item.entities.media[0].url : 'null'
                        object.name = item.user.name
                        object.profile_image_url = item.user.profile_image_url
                        JSONArray.push(object)
                    }
                }
            }
            res.send(JSON.stringify(JSONArray))
        })

    } // else end

})

exports.app = app
