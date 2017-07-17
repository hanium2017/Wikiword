/*
  뉴스, 도서, dbpia, youtube, twitter 등 데이터를 얻어 렌더링 함수를 실행
 */
function getDataRendering(object, predicate) {
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
function rendering(object, predicate) {

  var element = document.querySelector('.' + object.type + '-div');
  var items = ( object.type === "youtube")? object.json.items : object.json; // youtube는 예외 상황이 있다.
  element.innerHTML = '';

  if(items[0].hasOwnProperty('message')) {
    element.innerHTML = items[0].message;
  } else {
    items.forEach(item => {
      element.innerHTML += predicate(item);
    });
  }

}

/*
  기사 올라온 시간 구하는 함수
 */
function newDateForm(d) {
  let tmp = Math.floor(d / 1000);
  if (tmp < 60) {
    return tmp + '초 전';
  } else if (tmp < 60 * 60) {
    return Math.floor(tmp / 60) + '분 전';
  } else if (tmp < 60 * 60 * 24) {
    return Math.floor(tmp / (60 * 60)) + '시간 전';
  } else if (tmp < 60 * 60 * 24 * 365) {
    return Math.floor(tmp / (60 * 60 * 24)) + '일 전';
  } else {
    return Math.floor(tmp / (60 * 60 * 24 * 365)) + '년 전';
  }
}

/*
   이벤트 세팅 함수
 */
function eventSetting() {

  let search = document.querySelector('.input-search');
  search.value = data;

  document.querySelector('.title-div').addEventListener('click', e => {
    location.href = ('/')
  });

  document.querySelector('.search_icon').addEventListener('click', e => {
    console.log(e)
    console.log(search.value)
    if (search.value != '') {
      location.href = ('/result?query=' + search.value);
    } else {
      console.log(search.value, "no")
    }
  });

  search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      location.href = ('/result?query=' + search.value);
    }
  });
}
