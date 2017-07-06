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
  sessionFunction("check");
});


function keySetting(){
  axios({
     method: 'post',
     url: 'http://localhost:3000/account/setting'
   }).then(function(res){
     var key_data = res.data;
     google_oauthInit(key_data.google_client_id);
     setAppId(key_data.facebook_app_id);
   });
}


function sessionFunction(action, data){
  axios({
     method: 'post',
     url: 'http://localhost:3000/account/session/'+action,
     data : data
   }).then(function(res){
      var message = res.data.message;
      console.log(message);
   });
}
