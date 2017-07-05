// // 구글 oauth 설정 준비
// // DOM이 렌더링 된 후 실해됨
var googleUser = {};
var google_oauthInit = function(client_id) {
   gapi.load('auth2', function(){
     // Retrieve the singleton for the GoogleAuth library and set up the client.
     auth2 = gapi.auth2.init({
       client_id: client_id,
       cookiepolicy: 'single_host_origin',
       // Request scopes in addition to 'profile' and 'email'
       //scope: 'additional_scope'
     });
   });
 };


function gl_onSignIn(googleUser) {
  let signin = document.querySelector('#sign-in');
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

   signin.checked=false;
   gl_loginCheck(id_token, profile.getName());


   // console.log("ID Token: " + id_token);
   // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
   // console.log('Full Name: ' + profile.getName());
   // console.log('Given Name: ' + profile.getGivenName());
   // console.log('Family Name: ' + profile.getFamilyName());
   // console.log("Image URL: " + profile.getImageUrl());
   // console.log("Email: " + profile.getEmail());
}

function gl_signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log('User signed out.');
     gl_loginCheck(null, '')
  });
}

function gl_loginCheck(id_token, name){
  let signin = document.querySelector('.sign-in');
  let username = document.querySelector('.username');

   if(id_token){
     signin.classList.add('invisible');
     username.innerHTML = name +' 님';
     username.setAttribute('onclick','gl_signOut();');

   } else{
     signin.classList.remove('invisible');
     username.innerHTML = name;
     username.removeAttribute('onclick');
   }
}


function onFailure(error) {
  console.log(error);
}


function renderButton() {
  gapi.signin2.render('google_login', {
    'scope': 'profile email',
    'width': 300,
    'height': 56,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': gl_onSignIn,
    'onfailure': onFailure
  });
}
