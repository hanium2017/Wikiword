document.addEventListener('DOMContentLoaded', () => {

    eventSetting()
    renderInfoAjax(getJSONData);
    setTimeout(() => { document.querySelector('#loading').style.display = 'none';}, 3000)

    let moreBtnElement = document.querySelectorAll('.more');
    Array.from(moreBtnElement).forEach(link => {
        link.addEventListener('click', function(event) {
            let target = event.target;
            // const object = {
            //     title: target.getAttribute('title'),
            //     pageNum: target.getAttribute('nextnum'),
            //     search: document.querySelector('.input-search').value
            // }


            // moreAjax(object, getJSONData);

        });
    });

})
