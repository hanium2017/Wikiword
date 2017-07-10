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

  keySetting(); //Oauth 키 세팅
  sessionEvent("check");

});
