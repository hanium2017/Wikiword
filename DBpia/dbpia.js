const parseString = require('xml2js').parseString;
exports.analyzeXML = function (xml) {
  var json_data = [];
  parseString(xml, function(err, obj) {
    if(obj.hasOwnProperty('error')){
      json_data.push({"message":"검색 된 자료가 없습니다."});
    } else {
      var items = obj.root.result[0].items[0].item;
      for (var index in items) {
        var item = items[index];
        var object = {}
        object.title = item.title[0].replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        // object.authors = item.authors;
        object.pages = item.pages[0];
        object.pubDate = (item.issue[0].hasOwnProperty('yymm'))? item.issue[0].yymm[0] :''
        object.link_url = item.link_url;
        object.publisher = item.publisher;
        json_data.push(object);
      }
    }
  });
  return json_data;
}
