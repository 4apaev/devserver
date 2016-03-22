'use strict';
module.exports = (err, req, res) => {
  res.statusCode = 500;
  res.end(err ? err.message : err);
}