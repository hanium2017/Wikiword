// 세션 관련 함수
function sessionEvent(action, object){
  console.log(action);
  axios({
     method: 'post',
     url: 'http://localhost:3000/session/'+ action,
     data : object
   }).then(function(res){

      var message = res.data.message;
      var session = res.data.session;

      if(message === "true" && action ==="check"){
        console.log("type : " + session.type);
        if(session.type == "gl") {
          gl_loginCheck(session);    
        } else if(session.type == "fb"){   
          fb_loginCheck(session);  
        }
      } else{
        console.log("not session");
      }
   });
}


// 로그인시 키 세팅 함수
function keySetting(){
  axios({
     method: 'post',
     url: 'http://localhost:3000/setting'
   }).then(function(res){
     var key_data = res.data;
     google_oauthInit(key_data.google_client_id);
     facebook_setAppId(key_data.facebook_app_id);
   });
}


/*
  시간 구하는 함수
 */
function newDateForm(d) {
  let tmp = Math.floor(d / 1000);
  if (tmp < 60) {
    return tmp + '초 전';
  } else if (tmp < 60 * 60) {
    return Math.floor(tmp / 60) + '분 전';
  } else if (tmp < 60 * 60 * 24) {
    return Math.floor(tmp / (60 * 60)) + '시간 전';
  } else if (tmp < 60 * 60 * 24 * 365) {
    return Math.floor(tmp / (60 * 60 * 24)) + '일 전';
  } else {
    return Math.floor(tmp / (60 * 60 * 24 * 365)) + '년 전';
  }
}
