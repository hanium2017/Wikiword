document.addEventListener('DOMContentLoaded', () => {
  eventSetting()

  getJSONData({port: 21100, title: 'wikipedia', pageNum: '', host: host}, (item) => {
    return `<div class="wikipedia">
  <wikipedia-description><p>${item.content}</p></wikipedia-description></div>`
  })

  getJSONData({port: 21200, title: 'news', pageNum: 1}, (item) => {
    return `<div class="news"><a class="news-title" href="${item.link}">${item.title}</a>
                     <news-description>${item.description}</news-description>
                     <news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date>
                     </div>`
  })

  getJSONData({port: 21200, title: 'book', pageNum: 1}, (item) => {
    return `<div class="book"><a class="book-title" href="${item.link}">${item.title}</a>
            <img src="${item.image}"/><book-description>${item.description}</book-description>
            <book-date>${item.pubdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3').replace(/-/g, '-')}</book-date></div>`
  })

  getJSONData({port: 21300, title: 'pinterest', pageNum: ''}, (item) => {
    return `<a href="${item.image_url}"><img src="${item.image_url}"/></a>`
  })

  getJSONData({port: 21400, title: 'youtube', pageNum: ''}, (item) => {
    return `<div class="youtube"><a class="youtube-title" href='https://www.youtube.com/watch?v=${item.video_id}'>
            <img src="${item.thumbnail}"/><youtube-title>${item.title}</youtube-title></a>
            <youtube-date>${newDateForm(now - new Date(item.pubDate).getTime())}</youtube-date></div>`
  })

  getJSONData({port: 21500, title: 'twitter', pageNum: ''}, (item) => {
    return `<div class="twitter"><a href='${item.url}'><img src="${item.profile_image_url}"/>
              <twitter-text>${item.text}</twitter-text>
              <twitter-name>${item.name}</twitter-name>
              <twitter-date>${newDateForm(now - new Date(item.pubDate).getTime())}</twitter-date></a></div>`
  })

  getJSONData({port: 21600, title: 'dbpia', pageNum: 1}, (item) => {
    return `<div class="dbpia"><a class="dbpia-title" href="${item.link_url}">${item.title}</a>
           <dbpia-pages>${item.pages}</dbpia-pages>
           <dbpia-date>${item.pubDate}</dbpia-date></div>`
  })
})
