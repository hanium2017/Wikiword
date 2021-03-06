/*
    1. 전체 렌더링을 위한 ajax 함수
*/
function renderInfoAjax(getJSONData) {
    axios.post(`http://${host}:3000/rendering`)
        .then((response) => {
            const items = response.data
            for (let item of items) {
                item.eventType = 'all'
                getJSONData(item, contentRendering)
            }
            setTimeout(() => { document.querySelector('#loading').style.display = 'none' }, 2500)
        })

}

//## 더 보기 클릭시 실행할 ajax 함수
function moreAjax(object, getJSONData) {
    document.querySelector('#loading').style.display = 'block'
    axios.post(`http://${host}:3000/more`, { title: object.title })
        .then((response) => {
            object.port = response.data.port
            object.eventType = 'more'
            getJSONData(object, contentRendering)
            setTimeout(() => { document.querySelector('#loading').style.display = 'none' }, 1500)
        })
}

/*
  2. 뉴스, 도서, dbpia, youtube, twitter 등 데이터를 얻어 렌더링 함수를 실행
 */
function getJSONData(object, contentRendering) {
    axios.get(`http://${host}:${object.port}/${object.title}?search=${data}&pageNum=${object.pageNum}`)
        .then((response) => { contentRendering(object, response.data) })
        .catch((err) => { console.error(err) })
}

/*
  3. 실제 렌더링 함수
 */
function contentRendering(object, items) {

    let title = object.title,
        element = document.querySelector('.' + title + '-div'),
        moreBtnElement = document.querySelector('input.' + title + '-more')

    if (items[0].hasOwnProperty('message')) {

        if (title !== 'wikipedia') {
            moreBtnElement.style.display = 'none'
        }

        (object.eventType == 'all') ?
        element.innerHTML = '<div style="padding: 20px 0px;text-align:center;color: #bbb; font-weight: bold;"><img src="../images/main_logo0.svg" style="width: 300px;height: auto;display: inline-block;"/><br>' + items[0].message + '</div>': alert(items[0].message)

    } else {

        if (title !== 'wikipedia') {
            if (title === 'youtube') {
                if (items.length !== 6) {
                    moreBtnElement.style.display = 'none'
                } else {
                    moreBtnElement.setAttribute('nextNum', items.pop())
                }
            } else {
                if (items.length < 5) {
                    moreBtnElement.style.display = 'none'
                } else {
                    let temp = parseInt(moreBtnElement.getAttribute('nextNum')) + 1
                    moreBtnElement.setAttribute('nextNum', temp)
                }
            }
        }

        for (let item of items)
            element.innerHTML += template(title, item)
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
            break
        case 'google-image':
            template = `<a href=${item.href} target=_blank><img src='${item.src}'/></a>`
            break
        case 'news':
            template = `<div class=news><a class=news-title href=${item.link} target=_blank>${item.title}</a><news-description>${item.description}</news-description><news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date></div>`
            break
        case 'book':
            template = `<div class=book><img src=${item.image} /><div class=book-text><a class=book-title href=${item.link} target=_blank>${item.title}</a><book-description>${item.description}</book-description><book-date>${item.pubdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3').replace(/-/g, '-')}</book-date></div></div>`
            break
        case 'youtube':
            template = `<div class=youtube><a class=youtube-img href='https://www.youtube.com/watch?v=${item.video_id}' target=_blank><img src='${item.thumbnail}'/></a><div class=youtube-text><a class=youtube-title href='https://www.youtube.com/watch?v=${item.video_id}' target=_blank>${item.title}</a><div><youtube-date>${newDateForm(now - new Date(item.pubDate).getTime())}</youtube-date><youtube-viewCount> · 조회수 :  ${item.viewCount}</youtube-viewCount></div><div><youtube-channelTitle>게시자 :  ${item.channelTitle}</youtube-channelTitle></div><div><youtube-description> ${item.description}</youtube-description></div></div></div>`
            break
        case 'twitter':
            template = `<div class=twitter><a class=twitter-img ${setHref(item.url)} target=_blank><img src=${item.profile_image_url} /></a><div class=twitter-text><a class=twitter-img ${setHref(item.url)} target=_blank><twitter-text>${item.text}</twitter-text></a><twitter-name>${item.name}</twitter-name><twitter-date>${newDateForm(now - new Date(item.pubDate).getTime())}</twitter-date></div></div>`
            break
        default:
            template = `<div class=dbpia><a class=dbpia-title href=${item.link_url}target=_blank>${item.title}</a><dbpia-authors>${item.authors}</dbpia-authors><dbpia-pages>${undefinedCheck(item.publisher)} ${undefinedCheck(item.publication)} ${undefinedCheck(item.pubDate)} ${undefinedCheck(item.pages)}</dbpia-pages>`
    }
    return template
}



/* 트위터 링크 존재 여부 판단 함수 */
function setHref(href) {
    if (href != 'null') return 'href=' + href
}

function undefinedCheck(temp){
    if(temp != undefined) return temp + '&nbsp';
    else return ''
}

/*
   이벤트 세팅 함수
 */
function resultPageSetting() {

    let search = document.querySelector('.input-search')
    search.value = data

    //  더보기 버튼에 이벤트 붙이기
    document.querySelectorAll('.more').forEach(moreBtn => {
        moreBtn.addEventListener('click', function(e) {
            let target = e.target
            const object = {
                title: target.getAttribute('title'),
                pageNum: target.getAttribute('nextNum'),
                search: search.value
            }
            moreAjax(object, getJSONData)
        });
    });

    renderInfoAjax(getJSONData)

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
