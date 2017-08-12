const request = require('request'),
    google_api = require('../common/wikiword').API_KEY.google_api

exports.analyzeJSON = function(body, serverResponse) {
    const analyze_json = body,
        JSONArray = [],
        items = analyze_json.items

    require('async').eachSeries(items, function(item, callback) {
        let url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${google_api}`
        request(url, function(err, response, body) {
            if (!err && response.statusCode == 200) {
                const object = {}
                object.video_id = item.id.videoId
                object.viewCount = JSON.parse(body).items[0].statistics.viewCount
                object.title = item.snippet.title
                object.pubDate = item.snippet.publishedAt
                object.thumbnail = item.snippet.thumbnails.medium.url
                object.channelTitle = item.snippet.channelTitle
                object.description = item.snippet.description
                JSONArray.push(object)
            } else {
                console.log('Error = ' + serverResponse.status(response.statusCode).end())
            }
            callback()
        })
    }, function(err) {
        if (err) {
            console.log('Failed to process')
        } else {

            if (JSONArray.length == 5){
                JSONArray.push(analyze_json.nextPageToken) 
            }
            serverResponse.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
            serverResponse.end(JSON.stringify(JSONArray))
        }
    })
}
