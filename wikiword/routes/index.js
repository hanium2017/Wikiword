module.exports = function(app){
	const API_KEY = require('../../common/wikiword').API_KEY;
		/* wikiword main page. */
	app.get('/', function(req, res, next) {
	    res.render('index.html');
	});

	/* 검색 결과 페이지 */
	app.get('/result',function(req,res){
	  res.render('result.html',{ data : req.query.query });
	});

	/* 키값을 브라우저에 표시하지 않기 위해 서버에서 json 파일을 읽어 제공한다.*/
	app.post('/setting', function(req, res, next) {
	    res.send(JSON.stringify(
	        {'google_client_id': API_KEY.google_client_id,
	         'facebook_app_id' : API_KEY.facebook_app_id }
	    ));
	});
}
