require('./wikiword/app').listen(3000, () => { console.log('Example app listening on port 3000!'); });
require('./DBpia/app').listen(11000, () => { console.log('DBpia JSON listening on port 11000!');  });
require('./Naver/app').listen(12000, () => { console.log('Naver Open API listening on port 12000!'); });
require('./Youtube/app').listen(13000, () => { console.log('Youtube JSON listening on port 13000!'); });
