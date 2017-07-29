module.exports = function(app){
        // 세션을 생성
      app.post('/session/create', (req, res) => {
        let session = req.session;
        session.tokenId = req.body.tokenId;
        session.type = req.body.type; // 페이스북인지 구글인지
        session.userName = req.body.userName;
        session.save(err => {}) // 세션 체크를 위해 반드시 해야한다.
        console.log("seesion create");
      });

      // 세션 삭제
      app.post('/session/delete', (req, res) => {
        console.log("seesion destroy");
        req.session.destroy();
        res.clearCookie('sid');
      });


      // 세션 값 체크 및 가져오기
      app.post('/session/check', (req, res) => {
        const session = req.session;
        if(!session.tokenId)
          res.send(JSON.stringify({ message : "false"}));
        else 
          res.send(JSON.stringify({ message : "true", session : session }));
      });

    }



