function indexEventSetting () {

  // 로그인에 필요한 키 값 세팅함수
  keySetting();
  
  let logo = document.querySelector('.main_div img'),
    keyboard = document.querySelector('.keyboard')

  logo.addEventListener('click', e => {
    if (keyboard.classList.contains('long')) {

    } else {
      keyboard.classList.add('long')
    }
  })

  document.addEventListener('keydown', function (e) {
    console.log(e)
    if (keyboard.classList.contains('long')) {

    } else {
      keyboard.classList.add('long')
    }
  })

  keyboard.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      location.href = ('/result?query=' + keyboard.value)
    }
  })
  
  // 로그인 여부 확인 밑 이름 표시
  wikiWordSignInCheck()
}
