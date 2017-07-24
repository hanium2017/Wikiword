exports.analyzeJSON = function(body){

  var analyze_json = JSON.parse(body);
  var json_items =[];

  if(analyze_json.items.length === 0){
    json_items.push({"message":"검색 된 자료가 없습니다."});
  } else {
    json_items.nextPageToken = analyze_json.nextPageToken; // 배열도 객체다. 속성 따로 넣을 수 있다.
    var items = analyze_json.items;
    for(var index in items){
      var item = items[index];
      var object = {};
      object.video_id = item.id.videoId;
      object.title = item.snippet.title;
      object.pubDate =  item.snippet.publishedAt;
      object.thumbnail = item.snippet.thumbnails.medium.url;
      json_items.push(object);
    }
  }

  return json_items;
}
