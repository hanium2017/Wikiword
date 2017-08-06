exports.analyzeJSON = function (body, type) {
  const JSONArray = []
  const items = JSON.parse(body).items

  if (items.length === 0) {
    JSONArray.push({'message': '검색 된 자료가 없습니다.'})
  } else {
    let deleteAttribute = ((type == 'news') ? 'originallink' : 'isbn')
    for (let item of items) {
      delete item[deleteAttribute]
      JSONArray.push(item)
    }
  }
  return JSON.stringify(JSONArray)
}
