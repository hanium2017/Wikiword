// // 구글 oauth 설정 준비
// // DOM이 렌더링 된 후 실해됨
const googleUser = {};
let google_oauthInit = function(client_id) {
   gapi.load('auth2', function(){
     let auth2 = gapi.auth2.init({
       client_id: client_id,
       cookiepolicy: 'single_host_origin',
       scope: 'profile'
     });
     attachSignin(auth2, document.getElementById('google_login'));
   });
 };

function attachSignin(auth2, element) {

  auth2.attachClickHandler(element, {},
    function(googleUser) {
      gl_onSignIn(googleUser);
    }, function(error) {
      alert(JSON.stringify(error, undefined, 2));
    });
}


function gl_onSignIn(googleUser) {

  const object = {
    login_type: "google",
    token_id : googleUser.getAuthResponse().id_token.substring(0, 50),  //전체 길이가 1149임
    name : googleUser.getBasicProfile().getName(),
    email : googleUser.getBasicProfile().getEmail()
  };

  document.querySelector('#sign-in').checked=false;
  
   console.log('connected !');
   gl_loginElement(object);
   wikiWordSignIn(object);  // 로그인 성공 시 세션 생성

   // console.log("ID Token: " + id_token);
   // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
   // console.log('Full Name: ' + profile.getName());
   // console.log('Given Name: ' + profile.getGivenName());
   // console.log('Family Name: ' + profile.getFamilyName());
   // console.log("Image URL: " + profile.getImageUrl());
   // console.log("Email: " + profile.getEmail());
}

function gl_signOut() {
  wikiWordSignOut(); // 로그아웃 시 세션 삭제
  gapi.auth2.getAuthInstance().signOut().then(function() {
     console.log('User signed out.');
     setTimeout(function(){document.location.reload();}, 150);
  });
}

function gl_loginElement(object){

  let signin = document.querySelector('.sign-in');
  let username = document.querySelector('.username');

  if(object.login_type === "google" && object.token_id !== undefined){
     signin.classList.add('invisible');
     username.innerHTML = object.name +' 님';
     username.setAttribute('onclick','gl_signOut();');
   } 
}