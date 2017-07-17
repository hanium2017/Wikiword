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
