module.exports = function(app){
        // 세션을 생성
      let conmmonURL = "/session"
      app.post(conmmonURL+'/create', function(req, res) {
          let session = req.session;
          session.tokenId = req.body.id;
        session.type = req.body.type; // 페이스북인지 구글인지
        session.userName = req.body.name;
        session.save(function(err) {}) // 세션 체크를 위해 반드시 해야한다.
      });

      // 세션 삭제
      app.post(conmmonURL+'/delete', function(req, res){
        console.log("seesion destroy");
        req.session.destroy();
        res.clearCookie('sid');
      });


      // 세션 값 체크 및 가져오기
      app.post(conmmonURL+'/check', function(req, res){
        if(!req.session.tokenId){
          res.send(JSON.stringify({ message : "not session"}));
        } else {
          console.log("seesion Name : " + req.session.userName);
          res.send(JSON.stringify({ message : req.session.userName }));
        }
      });

    }



