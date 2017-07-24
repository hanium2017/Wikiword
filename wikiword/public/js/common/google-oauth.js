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
       scope: 'profile'
     });
      attachSignin(document.getElementById('google_login'));
   });
 };

function attachSignin(element) {

  auth2.attachClickHandler(element, {},
    function(googleUser) {
      gl_onSignIn(googleUser);
    }, function(error) {
      alert(JSON.stringify(error, undefined, 2));
    });
}


function gl_onSignIn(googleUser) {
  let signin = document.querySelector('#sign-in');
  let profile = googleUser.getBasicProfile();
  let id_token = googleUser.getAuthResponse().id_token;
  let name = profile.getName();

  signin.checked=false;
  var object = {
    type: "gl",
    tokenId : id_token,
    userName: name
  };
  
   console.log('connected !');
   gl_loginCheck(object);

   // console.log("ID Token: " + id_token);
   // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
   // console.log('Full Name: ' + profile.getName());
   // console.log('Given Name: ' + profile.getGivenName());
   // console.log('Family Name: ' + profile.getFamilyName());
   // console.log("Image URL: " + profile.getImageUrl());
   // console.log("Email: " + profile.getEmail());
}

function gl_signOut() {
  // let signin = document.querySelector('.sign-in');
  // let username = document.querySelector('.username');

  sessionEvent("delete");
  gapi.auth2.getAuthInstance().signOut().then(function() {
     console.log('User signed out.');
     // signin.classList.remove('invisible');
     // username.innerHTML = "";
     // username.removeAttribute('onclick');
     setTimeout(function(){document.location.reload();},300);
  });
}

function gl_loginCheck(object){

  sessionEvent("create", object);
  let signin = document.querySelector('.sign-in');
  let username = document.querySelector('.username');

  if(object.type === "gl" && object.tokenId !== undefined){
     signin.classList.add('invisible');
     username.innerHTML = object.userName +' 님';
     username.setAttribute('onclick','gl_signOut();');
   } 
}
