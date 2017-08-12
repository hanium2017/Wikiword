document.addEventListener('DOMContentLoaded', () => {
  eventSetting()
  renderInfoAjax(getJSONData)
  setTimeout(() => { document.querySelector('#loading').style.display = 'none' }, 2000)
})
