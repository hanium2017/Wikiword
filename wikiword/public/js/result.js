document.addEventListener('DOMContentLoaded', () => {
  
  eventSetting();
  getDataRendering({port: 12000, type: 'news'}, function(item) {
    return `<div class="news"><a class="news-title" href="${item.link}">${item.title}</a>
                     <news-description>${item.description}</news-description>
                     <news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date>
                     </div>`;
  });

})
