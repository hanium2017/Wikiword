document.addEventListener('DOMContentLoaded', () => {

  let search = document.querySelector('.input-search');
  let search_icon = document.querySelector('.search_icon');

  search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      location.href = ('/result?query=' + search.value);
    }
  });

  search_icon.addEventListener('click', e => {
    console.log(e)
    console.log(search.value)
    if (search.value != '') {
      location.href = ('/result?query=' + search.value);
    } else {
      console.log(search.value, "no")
    }
  });


  (function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { // 요청에 대한 콜백
      if (xhr.readyState === xhr.DONE) { // 요청이 완료되면
        if (xhr.status === 200 || xhr.status === 201) {
          var key_data = JSON.parse(xhr.responseText);
          google_oauthInit(key_data.google_client_id);
          setAppId(key_data.facebook_app_id);
        } else {
          console.error(xhr.responseText);
        }
      }
    };
    xhr.open('post', 'http://localhost:3000/keyset'); // 메소드와 주소 설정
    xhr.send();
  })();

});
