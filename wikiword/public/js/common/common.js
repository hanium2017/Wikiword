// 로그인시 키 세팅 함수
function keySetting(){
  axios({
     method: 'post',
     url: 'http://localhost:3000/setting'
   }).then(function(res){
     var key_data = res.data;
     console.log(key_data);
     google_oauthInit(key_data.google_client_id);
     facebook_setAppId(key_data.facebook_app_id);
   });
}


// 세션 관련 함수
function sessionEvent(action, data){
  axios({
     method: 'post',
     url: 'http://localhost:3000/session/'+action,
     data : data
   }).then(function(res){
      var message = res.data.message;
      console.log(message);
   });
}
