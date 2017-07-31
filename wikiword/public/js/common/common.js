
// 로그인 관련 함수
function wikiWordSignIn(object){
  axios.post(`http://${host}:3000/sign_in`, object);
}

function wikiWordSignOut(){
  axios.post(`http://${host}:3000/sign_out`);
}

function wikiWordSignInCheck(){
  axios.post(`http://${host}:3000/sign_in/check`)
  .then(function(res){
      let message = res.data.message,
          session = res.data.session;

      if(message === "true"){
        if(session.login_type == "google") {
          gl_loginElement(session);    
        } else if(session.login_type == "facebook"){   
          fb_loginElement(session);  
        }
      } else if(message === "false"){
        console.log("not session");
      }
   });
}


// 로그인시 키 세팅 함수
function keySetting(){
  axios({
     method: 'post',
     url: `http://${host}:3000/setting`
   }).then(function(res){
     let data = res.data;
     google_oauthInit(data.google_client_id);
     facebook_setAppId(data.facebook_app_id);
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
