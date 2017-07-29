exports.analyzeJSON = function(body){

  const analyze_json = JSON.parse(body),
        JSONArray =[];

  if(analyze_json.items.length === 0){
    JSONArray.push({"message":"검색 된 자료가 없습니다."});
  } else {
    JSONArray.nextPageToken = analyze_json.nextPageToken; // 배열도 객체다. 속성 따로 넣을 수 있다.
    const items = analyze_json.items;
    for(let item of items){
      const object = {};
      object.video_id = item.id.videoId;
      object.title = item.snippet.title;
      object.pubDate =  item.snippet.publishedAt;
      object.thumbnail = item.snippet.thumbnails.medium.url;
      JSONArray.push(object);
    }
  }

  return JSONArray;
}
