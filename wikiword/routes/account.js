const express = require('express');
const API_KEY = require('../../common/key');
const fs = require('fs');
const router = express.Router();

/* 키값을 브라우저에 표시하지 않기 위해 서버에서 json 파일을 읽어 제공한다.*/
router.post('/setting', function(req, res, next) {
  fs.readFile("./common/key.json","utf8", function(err, data){
      if (err) throw err;
      var temp = JSON.parse(data);
      res.send(JSON.stringify(
          {'google_client_id': temp.google_client_id,
           'facebook_app_id' : temp.facebook_app_id }
      ));
  });
});


router.post('/session/:action', function(req, res, next) {

    var action = req.params.action;
    if( action === 'add' ){
      req.session.tokenId = req.body.id;
      req.session.type = req.body.type;  // 페이스북인지 구글인지
      req.session.userName = req.body.name;
    } else if(action === 'delete'){
      req.session.destroy(function(err){req.session;});
    } else if(action === 'check'){ // 세션이 이미 있는 경우

    }

    res.send(JSON.stringify({'result': 'OK ' + action }));
});

module.exports = router;
