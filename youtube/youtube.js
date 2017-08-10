const request = require('request'),
    async = require('async'),
    google_api = require('../common/wikiword').API_KEY.google_api

exports.analyzeJSON = function(body, serverResponse) {
    const analyze_json = JSON.parse(body),
        JSONArray = []
    console.log(body);
    if (analyze_json.items.length === 0) {
        JSONArray.push({ 'message': '검색 된 자료가 없습니다.' })
        serverResponse.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
        serverResponse.end(JSON.stringify(JSONArray)) 
    } else {
        JSONArray.nextPageToken = analyze_json.nextPageToken // 배열도 객체다. 속성 따로 넣을 수 있다.
        const items = analyze_json.items
        async.eachSeries(items, function(item, callback) {
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
                callback();
            });
        }, function(err) {
            if (err) {
                console.log('Failed to process');
            } else {
                serverResponse.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
                serverResponse.end(JSON.stringify(JSONArray))  
            }
        });
    }
}
