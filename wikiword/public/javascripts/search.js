document.addEventListener('DOMContentLoaded',()=>{

  /*
    네이버 뉴스 api Ajax 함수
    뉴스 JSON 데이터를 받는다.
  */
  var now = new Date().getTime();
  axios({
     method: 'get',
     url: 'http://localhost:12000/news?search='+ data + '&pageNum=1'
   }).then(function(res){
     var newsdiv = document.querySelector('.news-div');
     var inputsearch = document.querySelector('.input-search');
     inputsearch.value = data;
     newsdiv.innerHTML = '';
/*res 는 배열형식
반복 돌림
item들
*/
console.log(res)
     res.data.items.forEach(item=>{
       console.log(item);
       console.log(newsdiv);

       newsdiv.innerHTML += `<div class="news">
                                <a class="news-title" href="${item.link}">${item.title}</a>
                                <news-description>${item.description}</news-description>
                                <news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date>
                             </div>`;
     });

   }).catch(function(err){
     console.error(err);
   });

});


// 기사 올라온 시간 구하는 함수
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
