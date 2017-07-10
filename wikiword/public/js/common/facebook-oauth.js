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
    fb_loginCheck();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
});

let app_id = null;
function setAppId(id){
    console.log("id : " + id)
    app_id = id;
}

// 페이스북 로그인 체크 함수
function fb_loginCheck(){
  let signin = document.querySelector('.sign-in');
  let username = document.querySelector('.username');
  FB.api('/me',response=>{
    if(response.id){
      //signin.style.display = 'none';
      signin.classList.add('invisible');
      username.innerHTML = response.name+' 님';
      username.setAttribute('onclick','fb_logout();');
      response.type = "fb";
      sessionFunction("create", response);
      // setTimeout(function(){ sessionFunction("check"); }, 200);
    }else{
      //signin.style.display = "inline-block";
      signin.classList.remove('invisible');
      username.innerHTML = '';
      username.removeAttribute('onclick');
    }

  });
}


// 페이스북 로그인 함수
function fb_login(){
  let signin = document.querySelector('#sign-in');
  FB.login(function(response) {
     if (response.status === 'connected') {
       console.log('connected !');
       signin.checked=false;
       fb_loginCheck();
     } else {
       console.log('Problem!!')
     }
   }, {scope: 'public_profile, email'});
}

// 페이스북 로그인 아웃
function fb_logout(){
  FB.logout(function(response){
    sessionFunction("delete");
    // setTimeout(function(){ sessionFunction("check"); }, 200);
    fb_loginCheck();
  });
}
