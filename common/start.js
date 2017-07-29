'use strict';
const SERVER_INFO = require('./wikiword').SERVER_INFO;
for(let server of SERVER_INFO){	
	require('../'+ server.title + "/app").app.listen( server.port , 
		() => console.log('start listening on port' + server.port));
};
