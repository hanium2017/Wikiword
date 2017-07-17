// 뉴스, books, 유튜브, DBpia 데이터를 얻어서 렌더링 하는 함수
function getDataRendering(object, predicate) {
  axios({
    method: 'get',
    url: 'http://localhost:' + object.port + '/' + object.type + '?search=' + data + '&pageNum=1'
  }).then(function(res) {
    rendering(res.data, object.type, predicate)
  }).catch(function(err) {
    console.error(err);
  });
}

// 실제 렌더링 함수
function rendering(items, type, predicate) {
  var element = document.querySelector('.' + type + '-div');
  element.innerHTML = '';
  items.forEach(item => {
    element.innerHTML += predicate(item);
  });
}


// 기사 올라온 시간 구하는 함수
function newDateForm(d) {
  let tmp = Math.floor(d / 1000);
  console.log(tmp);
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
  //return tmp+'초 전';
}



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
