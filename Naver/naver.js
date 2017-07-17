exports.analyzeJSON = function (body, type){
  const JSONArray = [];
  let items = JSON.parse(body).items;

  if(items.length === 0){
    JSONArray.push({"message":"찾을려는 자료가 없습니다."});
  } else {
    let deleteAttribute = (( type == 'news') ? 'originallink' : 'isbn');
    for(var i = 0, max = items.length; i < max; i++){
      let JSONObject = items[i];
      delete JSONObject[deleteAttribute];
      JSONArray.push(JSONObject);
    }
  }
  return JSON.stringify(JSONArray);
}
