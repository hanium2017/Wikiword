document.addEventListener('DOMContentLoaded', () => { 
    resultEventSetting()
    renderInfoAjax(getJSONData)  
    setTimeout(() => { document.querySelector('#loading').style.display = 'none' }, 1500)}
)
