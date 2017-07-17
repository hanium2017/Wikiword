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
