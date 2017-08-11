/*
    1. 전체 렌더링을 위한 ajax 함수
*/
function renderInfoAjax(callback) {
    axios.post(`http://${host}:3000/rendering`)
        .then((response) => {
            const items = response.data;
            for (let item of items) { callback(item, contentRender); }
        })
}

/*
  2. 뉴스, 도서, dbpia, youtube, twitter 등 데이터를 얻어 렌더링 함수를 실행
 */
function getJSONData(object, callback) {
    axios.get(`http://${host}:${object.port}/${object.title}?search=${data}&pageNum=${object.pageNum}`)
        .then((res) => { callback(object.title, res.data) })
        .catch((err) => { console.error(err) })
}


/*
  3. 실제 렌더링 함수
 */
function contentRender(title, items) {
    let element = document.querySelector('.' + title + '-div')
    if (items[0].hasOwnProperty('message')) {
        element.innerHTML = '<h1>' + items[0].message + '</h1>'
    } else {
        moreBtnRender(title, items)
        for (let item of items) element.innerHTML += template(title, item)
    }
}


/*
    4. 더 보기 버튼 이벤트 세팅 및 렌더링
 */
function moreBtnRender(title, items) {
    let moreBtnElement = document.querySelector('input.' + title + '-more')
    if (title == 'youtube') {
        // 유튜브는 다음 데이터에 대한 토큰이 따로 있다.
        if (items.length > 5) {
            let nextToken = items.pop();
            moreBtnElement.setAttribute('nextNum', nextToken);
        } else {
            moreBtnElement.style.display = none;
        }
    } else if (title != ('wikipedia' || 'youtube')) {
        let temp = parseInt(moreBtnElement.getAttribute('nextNum')) + 1;
        moreBtnElement.setAttribute('nextNum', temp);
    }
}

/*
    5. 타입에 따른 콘텐츠 템플릿 선택
 */
function template(title, item) {
    let template = null
    switch (title) {
        case 'wikipedia':
            template = `<div class=wikipedia><wikipedia-description><p>${item.content}</p></wikipedia-description></div>`
            break;
        case 'image':
            template = `<a href=${item.href} target=_blank><img src='${item.src}'/></a>`
            break;
        case 'news':
            template = `<div class=news><a class=news-title href=${item.link} target=_blank>${item.title}</a><news-description>${item.description}</news-description><news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date></div>`
            break;
        case 'book':
            template = `<div class=book><img src=${item.image}/><div class=book-text><a class=book-title href=${item.link} target=_blank>${item.title}</a><book-description>${item.description}</book-description><book-date>${item.pubdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3').replace(/-/g, '-')}</book-date></div></div>`
            break;
        case 'youtube':
            template = `<div class=youtube><a class=youtube-img href='https://www.youtube.com/watch?v=${item.video_id}' target=_blank><img src='${item.thumbnail}'/></a><div class=youtube-text><a class=youtube-title href='https://www.youtube.com/watch?v=${item.video_id}' target=_blank>${item.title}</a><div><youtube-date>${newDateForm(now - new Date(item.pubDate).getTime())}</youtube-date><youtube-viewCount> · 조회수 :  ${item.viewCount}</youtube-viewCount></div><div><youtube-channelTitle>게시자 :  ${item.channelTitle}</youtube-channelTitle></div><div><youtube-description> ${item.description}</youtube-description></div></div></div>`
            break;
        case 'twitter':
            template = `<div class=twitter><a class=twitter-img ${setHref(item.url)} target=_blank}><img src=${item.profile_image_url}/></a><div class=twitter-text><a class=twitter-img ${setHref(item.url)} target=_blank}><twitter-text>${item.text}</twitter-text></a><twitter-name>${item.name}</twitter-name><twitter-date>${newDateForm(now - new Date(item.pubDate).getTime())}</twitter-date></div></div>`
            break;
        default:
            template = `<div class=dbpia><a class=dbpia-title href=${item.link_url}target=_blank>${item.title}</a><dbpia-authors>${item.authors}</dbpia-authors><dbpia-pages>${item.publisher}, ${item.publication}, ${item.pubDate}, ${item.pages}</dbpia-pages>`
    }
    return template;
}


// 더 보기 클릭시 실행할 ajax 함수
function moreAjax(object, handleData) {
    axios.post(`http://${host}:3000/more`, { title: object.title })
        .then((response) => { handleData(object, response.data.port); })
}

/* 트위터 링크 존재 여부 판단 함수*/
function setHref(href) { 
    if (href != 'null') return 'href=' + href 
}

/*
   이벤트 세팅 함수
 */
function eventSetting() {
    let search = document.querySelector('.input-search')
    search.value = data

    document.querySelector('.title-div').addEventListener('click', e => {
        location.href = ('/')
    })

    document.querySelector('.search_icon').addEventListener('click', e => {
        if (search.value != '') location.href = (`/result?query=${search.value}`)
        else console.log(search.value, 'no')
    })

    search.addEventListener('keyup', e => {
        if (e.keyCode === 13) location.href = (`/result?query=${search.value}`)
    })
}
