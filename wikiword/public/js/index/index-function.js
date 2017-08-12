function indexEventSetting () {
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
}
