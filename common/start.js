'use strict';
const SERVER_INFO = require('./wikiword').SERVER_INFO;
for (var i = 0, max = SERVER_INFO.length; i < max; i++){

  let server = SERVER_INFO[i],
      app = require('../'+ server.title + "/app").app,
		  port = server.port

	app.listen( port , () => console.log('start listening on port' + port));
};
