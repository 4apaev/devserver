module.exports = fin;
function fin(err, req, res) {
  'use strict';
  res.statusCode = err ? 500 : 200;
  res.end(err ? err.toString() : 'ok');
}
