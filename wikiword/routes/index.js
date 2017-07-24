module.exports = function(app){
	const wikiword = require('../../common/wikiword');
	const API_KEY = wikiword.API_KEY;
	const HOST = wikiword.HOST;

	/* 서버 배포시 자동적으로 ip 적용하기 위해서 */	
	console.log(require('os').type());
	let hostIP = ('Linux' == require('os').type())? HOST.Linux : HOST.Windows; 
	console.log("OS Platform HOST : " + hostIP);
	app.get('/', function(req, res, next) {
	    res.render('index.html', { host : hostIP});
	});

	/* 검색 결과 페이지 */
	app.get('/result',function(req,res){
	  res.render('result.html',{ data : req.query.query,  host : hostIP});
	});

	/* 키값을 브라우저에 표시하지 않기 위해 서버에서 json 파일을 읽어 제공한다.*/
	app.post('/setting', function(req, res, next) {
	    res.send(JSON.stringify(
	        {'google_client_id': API_KEY.google_client_id,
	         'facebook_app_id' : API_KEY.facebook_app_id }
	    ));
	});
}
