'use strict';
let browserify = require('browserify');

module.exports = function(bundle) {
  return function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript');
    let b = browserify(bundle).bundle();
    b.on('error', console.error);
    b.pipe(res);
  }
}
