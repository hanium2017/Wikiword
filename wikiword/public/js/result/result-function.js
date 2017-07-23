/*
  뉴스, 도서, dbpia, youtube, twitter 등 데이터를 얻어 렌더링 함수를 실행
 */
function getJSONData(object, predicate) {
  axios({
    method: 'get',
    url: 'http://localhost:' + object.port + '/' + object.type + '?search=' + data + '&pageNum=' + object.pageNum
  }).then(function(res) {
    object.json = res.data;
    rendering(object, predicate)
  }).catch(function(err) {
    console.error(err);
  });
}


/*
  실제 렌더링 함수
 */
function rendering(object, predicate ){

  var element = document.querySelector('.' + object.type + '-div');
  var items = object.json;

  element.innerHTML = '';

  // 어예 데이터 없을시 처리
  if(items[0].hasOwnProperty('message')) {
    element.innerHTML = '<h1>'+items[0].message+'</h1>';
  }
//   else if(object.type == 'wikipedia'){
//       // (items.length > 1)? predicate(item, str1) : predicate(item, str2);
// }
else {
    items.forEach(item => {
      element.innerHTML += predicate(item);
    });
  }

}


/*
   이벤트 세팅 함수
 */
function eventSetting() {

  let search = document.querySelector('.input-search');
  search.value = data;

  document.querySelector('.title-div').addEventListener('click', e => {
    location.href = ('/');
  });

  document.querySelector('.search_icon').addEventListener('click', e => {
    console.log(e)
    console.log(search.value)
    if (search.value != '') {
      location.href = ('/result?query=' + search.value);
    } else {
      console.log(search.value, "no");
    }
  });

  search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      location.href = ('/result?query=' + search.value);
    }
  });
}
