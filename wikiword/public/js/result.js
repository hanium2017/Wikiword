document.addEventListener('DOMContentLoaded', () => {

  eventSetting();

  getDataRendering({port: 12000, type: 'news',pageNum:1}, function(item) {
    return `<div class="news"><a class="news-title" href="${item.link}">${item.title}</a>
                     <news-description>${item.description}</news-description>
                     <news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date>
                     </div>`;
  });


  getDataRendering({port: 12000, type: 'book',pageNum:1}, function(item) {
    return `<div class="book"><a class="book-title" href="${item.link}">${item.title}</a>
            <book-description>${item.description}</book-description><book-date>${item.pubdate}</book-date></div>`;
  });


  getDataRendering({port: 13000, type:'youtube',pageNum:''}, function(item) {
    return `<div class="youtube"><a class="youtube-title" href='https://www.youtube.com/watch?v=${item.video_id}'>
            <img src="${item.thumbnail}"/>${item.title}</a><youtube-date>${item.pubdate}</youtube-date></div>`;
  });


  getDataRendering({port: 16000, type:'dbpia',pageNum:'1'}, function(item) {
   return `<div class="dbpia"><a class="dbpia-title" href="${item.link_url}">${item.title}</a>
            <dbpia-pages>${item.pages}</dbpia-pages><dbpia-date>${item.pubdate}</dbpia-date></div>`;
  });

})
