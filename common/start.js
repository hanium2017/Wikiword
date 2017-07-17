  require('../wikiword/app').app.listen(3000, () => { console.log('Example app listening on port 3000!'); });
  require('../Naver/app').app.listen(12000, () => { console.log('Naver Open API listening on port 12000!'); });
  require('../Youtube/app').app.listen(13000, () => { console.log('Youtube JSON listening on port 13000!'); });
    require('../twitter/app').app.listen(14000, () => { console.log('twitter JSON listening on port 14000!');  });
  require('../DBpia/app').app.listen(16000, () => { console.log('DBpia JSON listening on port 16000!');  });
