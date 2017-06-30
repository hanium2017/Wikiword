document.addEventListener('DOMContentLoaded',()=>{
  let search = document.querySelector('.input-search');
  search.addEventListener('keyup',e=>{

    if(e.keyCode===13){
      location.href = ('/search2?query='+search.value);
      console.log(search.value);
      axios({
       method: 'get',
       url: '/search?query='+search.value
     }).then(function(res){
       console.log(res);
       console.log('123');
     }).catch(function(err){
       console.error(err);
     })
    }
  });

  console.log("<%= data %>");
  console.log(new Date().getTime())
  var now = new Date().getTime();
      axios({
       method: 'get',
       url: '/search?query='+ data
     }).then(function(res){
       var newsdiv = document.querySelector('.news-div');
       var inputsearch = document.querySelector('.input-search');
       inputsearch.value = data;
       newsdiv.innerHTML = '';
       res.data.items.forEach(item=>{
         console.log(item);
         console.log(newsdiv);

         newsdiv.innerHTML += `<div class="news">
                                  <a class="news-title" href="${item.link}">${item.title}</a>
                                  <news-description>${item.description}</news-description>
                                  <news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date>
                               </div>
                              `;
       });
     }).catch(function(err){
       console.error(err);
     });
});

function newDateForm(d){
  let tmp = Math.floor(d/1000);
  console.log(tmp);
  if(tmp < 60){
    return tmp + '초 전';
  }else if(tmp < 60 * 60){
    return Math.floor(tmp/60) + '분 전';
  }else if(tmp < 60 * 60 * 24){
    return Math.floor(tmp/(60*60)) + '시간 전';
  }else if(tmp < 60 * 60 * 24 * 365){
    return Math.floor(tmp/(60*60*24)) + '일 전';
  }else{
    return Math.floor(tmp/(60*60*24*365)) + '년 전';
  }
  //return tmp+'초 전';

}
