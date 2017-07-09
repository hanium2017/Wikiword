const express = require('express');
const API_KEY = require('../../common/key');
const router = express.Router();

/* 키값을 브라우저에 표시하지 않기 위해 서버에서 json 파일을 읽어 제공한다.*/
router.post('/setting', function(req, res, next) {
    res.send(JSON.stringify(
        {'google_client_id': API_KEY.google_client_id,
         'facebook_app_id' : API_KEY.facebook_app_id }
    ));
});

// 세션을 생성
router.post('/session/create', function(req, res) {
  let session = req.session;
  session.tokenId = req.body.id;
  session.type = req.body.type; // 페이스북인지 구글인지
  session.userName = req.body.name;
  session.save(function(err) {}) // 세션 체크를 위해 반드시 해야한다.
});

// 세션 삭제
router.post('/session/delete', function(req, res){
  req.session.destroy();
  res.clearCookie('sid');
});


// 세션 값 체크 및 가져오기
router.post('/session/check', function(req, res){
    if(!req.session.tokenId){
      res.send(JSON.stringify({ message : "not session"}));
    } else {
      console.log("seesion Name : " + req.session.userName);
      res.send(JSON.stringify({ message : req.session.userName }));
    }
});


module.exports = router;
