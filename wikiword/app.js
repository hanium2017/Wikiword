/**
 *  필요 모듈 세팅 및 환경 설정 부분
 */

const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	swig = require('swig'), 
	express_session = require('express-session'), 
	cookieParser = require('cookie-parser'),
	CORS = require('cors')(),
	morgan = require('morgan'), 
	app = express();
	
app.use(CORS);
app.use(morgan())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(express_session({
  key: 'sid', // 세션키
  secret: 'secret', // 비밀키
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));


/**
 * 라우트 선언 부분
 */
const index = require('./routes/index')(app),
	  session = require('./routes/session')(app);


exports.app = app;
