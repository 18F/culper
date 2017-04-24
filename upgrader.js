var fs = require('fs');
var child_process = require('child_process');

var filterRegex = /@angular\/.*/;

fs.readFile('./package.json', function(err, data) {
  if (err) throw err;

  var dependencies = JSON.parse(data)['devDependencies'];
  Object.keys(dependencies).forEach(function(dependency) {
    console.log('Upgrading ' + dependency);
    child_process.execSync('yarn upgrade ' + dependency);
  });
});
