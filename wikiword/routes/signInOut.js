module.exports = function(app, dbPool){

      // 로그인
      app.post('/sign_in', (req, res) => {
        
         const body = req.body;
         const object = { 
                token_id: body.token_id, 
                login_type : body.login_type, 
                name : body.name, 
                email : body.email 
         };


         dbPool.getConnection(function(err, conn){
            conn.query('select count(*) as count from wk_member where token_id = ?', [object.token_id], 
              function(err, rows){
                if(rows[0].count != 1){
                  conn.query('insert into wk_member set ?', object, function(err, rows){
                      
                      if(err) console.log(err);
            
                      createSession(object, req.session)
                      conn.release();
                  });
                }
              }); 
           })
         });

      // 로그 아웃
      app.post('/sign_out', (req, res) => {
        console.log("seesion destroy");
        req.session.destroy();
        res.clearCookie('sid');
      });


      // 로그인 체크(세션 확인)
      app.post('/sign_in/check', (req, res) => {
        if(!req.session.token_id)
          res.send(JSON.stringify({ message : "false"}));
        else 
          res.send(JSON.stringify({ message : "true", session : req.session }));
      });

}


function createSession(object, session){
  session.token_id = object.token_id;
  session.login_type = object.login_type; // 페이스북인지 구글인지
  session.name = object.name;
  session.email = object.email;
  session.save(err => {}) // 세션 체크를 위해 반드시 해야한다.
}


