var path = require('path');
var babel = require('babel-core');

var result = babel.transformFile(path.resolve(__dirname, './a.js'), {
  presets: ['env'],
  plugins: ['transform-runtime']
}, function (err, result) {
  console.log(result);
});
