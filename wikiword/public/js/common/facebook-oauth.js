// 페이스북 oauth 설정 준비
// DOM이 렌더링 된 후 실해됨
document.addEventListener('DOMContentLoaded',() => {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : app_id,
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
});


////////////////////////////////////////////////////////////////////////////////

let app_id = null;
function facebook_setAppId(id){
    app_id = id;
}

// 페이스북 로그인 체크 함수
function fb_loginElement(object){
   
  let signin = document.querySelector('.sign-in'),
      username = document.querySelector('.username');
    
  if(object.type === "fb" && object.tokenId !== undefined){
      signin.classList.add('invisible');
      username.innerHTML = object.userName+' 님';
      username.setAttribute('onclick','fb_logout();');
    } 
}


// 페이스북 로그인 함수
function fb_login(){

  FB.login(function(response) {

   if (response && response.status === 'connected') {

     document.querySelector('#sign-in').checked=false;
     FB.api('/me',response=>{
          var object = {
            type: "fb",
            tokenId : response.id,
            userName: response.name
          };
          fb_loginElement(object);
          sessionCreate(object);  
      });

   } else {
     console.log('Problem!!')
   }

 }, {scope: 'public_profile, email'});
}

// 페이스북 로그인 아웃
function fb_logout(){

  FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
         sessionDelete();
          FB.logout(function(response) {
              setTimeout(function(){document.location.reload();},200);
          });
      } else {
        setTimeout(function(){document.location.reload();},200);
      }
  });
}
