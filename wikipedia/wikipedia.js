exports.homonymCrawling = function (jQuery) {
  let url = 'https://ko.wikipedia.org'
  const JSONArray = []
  jQuery('.mw-parser-output li').each(function (idx) {
    const object = {},
      liTag = jQuery(this)

    liTag.find('a').each(function () {
      // 여기서 anchorElement는 litag안 a태그 자신을 가리킨다.
      const anchorElement = jQuery(this)
      anchorElement.attr('href', url + anchorElement.attr('href'))
    })
    object.content = liTag.html()
    JSONArray.push(object)
  })

  return JSONArray
}

exports.wikiSearchCrawling = function (jQuery) {
  let str = '', bool = true, pattern = /\[.{1,4}\]/g, url = 'https://ko.wikipedia.org'
  const JSONArray = [], object = {}
  // object.name = jQuery("#firstHeading").text();
  // object.image_url = jQuery("#mw-content-text .infobox .image img").attr("src");
  jQuery('div.mw-parser-output p').each(function (idx) {
    let pTag = jQuery(this)
    if (pTag['0'].children.length === 0 && bool === true) {
      bool = false
    } else if (bool === true) {
      pTag.find('a').each(function () {
        // 여기서 anchorElement는 ptag안 a태그 자신을 가리킨다.
        let anchorElement = jQuery(this)
        anchorElement.attr('href', url + anchorElement.attr('href'))
        anchorElement.attr('target', '_blank')
      })
      str += pTag.html().replace(pattern, '')
    }
  })
  object.content = str

  if (object.content == '') { JSONArray.push({'message': '찾는 내용이 없습니다.'}) } else { JSONArray.push(object) }

  return JSONArray
}

exports.htmlClassCheck = function (jQuery) {
  if (jQuery('div.notice.metadata.plainlinks').length != 0) { return true } else { return false }
}
