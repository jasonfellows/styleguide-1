console.log ('* Generating JSON from KSS...');

var kss = require('kss');
var fs = require('fs');//filesystem api

kss.traverse('./src/scss/', {}, function(err, styleguide) {
  if (err) throw err;
  console.log ('* Success! Saving each section to a separate JSON file...');

  var sections = JSON.parse(JSON.stringify(styleguide.data.sections));

  var writeFile = function(dirName, err) {
    if (err) throw err;
    fs.writeFile('./site/public/docs/kss/'+dirName+'/_data.json', JSON.stringify(obj,null,4), function(err){
      if (err) throw err;
      console.log ('* Data saved!');
    });
  };

  for(var i=0;i<sections.length;i++) {
    var obj = sections[i];
    var dirName = obj.header;
    var path = './site/public/docs/kss/'+dirName;
    if (!fs.existsSync(path)) {
        fs.mkdir(path, writeFile(dirName, err));
    } else {
      writeFile(dirName, err);
    }
  };

});
