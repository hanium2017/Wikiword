exports.analyzeXML = function(xml) {
    const JSONArray = []

    require('xml2js').parseString(xml, function(err, obj) {

        if (obj.hasOwnProperty('error')) {
            // 처음부터 논문이 검색 안될 때
            JSONArray.push({ 'message': '검색 된 논문이 없습니다.' })
        } else {
            const items = obj.root.result[0].items[0].item
            if (items !== undefined) {
                for (let item of items) {
                    const object = {}
                    object.title = item.title[0].replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, '')

                    if (item.authors) {
                        object.authors = []
                        let authors = item.authors[0].author
                        for (let author of authors) {
                            object.authors.push(author.name[0])
                        }
                    }

                    object.pages = (item.hasOwnProperty('pages')) ? item.pages[0] : ''
                    object.pubDate = (item.issue[0].hasOwnProperty('yymm')) ? item.issue[0].yymm[0] : ''
                    object.link_url = item.link_url[0]
                    object.publisher = item.publisher[0].name[0]
                    object.publication = item.publication[0].name[0]
                    JSONArray.push(object)
                }
            } else {
                // 논문 더 검색시 없을때
                JSONArray.push({ 'message': '검색 된 논문이 없습니다.' })
            }
        }
    })
    return JSONArray
}
