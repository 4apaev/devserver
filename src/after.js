'use strict';

module.exports = function after(err, req, res) {
    res.statusCode = err ? 500 : 200;
    res.end(err ? err.toString() : 'ok');
  }