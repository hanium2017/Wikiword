document.addEventListener('DOMContentLoaded', function() {
  let logo = document.querySelector('.main_div img');
  let keyboard = document.querySelector('.keyboard');
  logo.addEventListener('click', e => {
    if (keyboard.classList.contains('long')) {} else {
      keyboard.classList.add('long');
    }
  });

  document.addEventListener('keydown', function(e) {
    console.log(e);
    if (keyboard.classList.contains('long')) {} else {
      keyboard.classList.add('long');
    }
  });

  keyboard.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      location.href = ('/result?query=' + keyboard.value);
    }
  });


  // search_icon.addEventListener('click', e => {
  //   console.log(e)
  //   console.log(search.value)
  //   if (search.value != '') {
  //     location.href = ('/result?query=' + search.value);
  //   } else {
  //     console.log(search.value, "no")
  //   }
  // });

  keySetting(); //Oauth 키 세팅
  sessionEvent("check");
});
