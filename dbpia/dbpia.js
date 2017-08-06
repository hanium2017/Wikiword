exports.analyzeXML = function (xml) {
  const JSONArray = []

  require('xml2js').parseString(xml, function (err, obj) {
    if (obj.hasOwnProperty('error')) {
      JSONArray.push({'message': '검색 된 자료가 없습니다.'})
    } else {
      const items = obj.root.result[0].items[0].item
      for (let item of items) {
        const object = {}
        object.title = item.title[0].replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, '')
        object.authors = item.authors
        object.pages = (item.hasOwnProperty('page')) ? item.pages[0] : ''
        object.pubDate = (item.issue[0].hasOwnProperty('yymm')) ? item.issue[0].yymm[0] : ''
        object.link_url = item.link_url
        object.publisher = item.publisher
        JSONArray.push(object)
      }
    }
  })
  return JSONArray
}
