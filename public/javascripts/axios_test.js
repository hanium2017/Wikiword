

document.addEventListener('DOMContentLoaded',()=>{
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1974940292729310',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    loginCheck();
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



   let search = document.querySelector('.input-search');
   search.addEventListener('keyup',e=>{

     if(e.keyCode===13){
       location.replace('/search2?query='+search.value);
       console.log(search.value);
       axios({
        method: 'get',
        url: '/search?query='+search.value
      }).then(function(res){
        console.log(res);
        console.log('123');
      }).catch(function(err){
        console.error(err);
      })
     }
   });




});


function loginCheck(){
  let signin = document.querySelector('.sign-in');
  let username = document.querySelector('.username');
  FB.api('/me',response=>{
    if(response.id){
      //signin.style.display = 'none';
      signin.classList.add('invisible');
      username.innerHTML = response.name+' 님';
    }else{
      //signin.style.display = "inline-block";
      signin.classList.remove('invisible');
      username.innerHTML = '';
    }
    console.log(response);
  });
}

function login(){
  let signin = document.querySelector('#sign-in');
  FB.login(function(response) {
     console.log(response);
     if (response.status === 'connected') {
       console.log('connected !');
       signin.checked=false;
       loginCheck();
     } else {
       console.log('Problem!!')
     }
   }, {scope: 'public_profile, email'});
}

function logout(){
  FB.logout(function(response){
    console.log(response);
    loginCheck();
  });
}
