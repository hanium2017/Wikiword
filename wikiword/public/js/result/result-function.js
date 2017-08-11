/*
  뉴스, 도서, dbpia, youtube, twitter 등 데이터를 얻어 렌더링 함수를 실행
 */
function getJSONData (object, predicate) {
  axios({
    method: 'get',
    url: `http://${host}:${object.port}/${object.title}?search=${data}&pageNum=${object.pageNum}`
  }).then(function (res) {
    object.json = res.data
    rendering(object, predicate)
  }).catch(function (err) {
    console.error(err)
  })
}

/*
  실제 렌더링 함수
 */
function rendering (object, predicate) {
  let element = document.querySelector('.' + object.title + '-div')
  const items = object.json

  element.innerHTML = ''

  // 어예 데이터 없을시 처리
  if (items[0].hasOwnProperty('message')) {
    element.innerHTML = '<h1>' + items[0].message + '</h1>'
  } else {
    for (let item of items) 
      element.innerHTML += predicate(item)
  }
}

function setHref(href){
    if(href != 'null'){
      console.log(href);
      return 'href='+ href
    }
}

/*
   이벤트 세팅 함수
 */
function eventSetting () {
  let search = document.querySelector('.input-search')
  search.value = data

  document.querySelector('.title-div').addEventListener('click', e => {
    location.href = ('/')
  })

  document.querySelector('.search_icon').addEventListener('click', e => {
    console.log(e)
    console.log(search.value)
    if (search.value != '') {
      location.href = (`/result?query=${search.value}`)
    } else {
      console.log(search.value, 'no')
    }
  })

  search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      location.href = (`/result?query=${search.value}`)
    }
  })
}
