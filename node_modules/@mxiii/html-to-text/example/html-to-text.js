var path = require('path');
var fs = require('fs');

var htmlToText = require('../lib/html-to-text');

console.log('fromString:');
var text = htmlToText.fromString('<h1>Hello World</h1>', {
  wordwrap: 130
});
console.log(text);
console.log();

console.log('fromFile:');
fs.readFile(path.join(__dirname, 'test.html'), 'utf8', function(err, html) {
  if (err) {
    console.log(err);
  } else {
    var options = {
      tables: ['#invoice', '.address']
    };
    var text = htmlToText.fromString(html, options);
    console.log(text);
  }
});
