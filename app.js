var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var search = require('./routes/search');
var ejs = require('ejs');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use('/', index);
app.use('/search', search);
app.listen(3000, () => { console.log('Example app listening on port 3000!'); });
