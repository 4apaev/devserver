'use strict';
let Url = require('url');
let Parse = require('querystring').parse;

module.exports = (req, res, next) => {
  req.query = Parse(Url.parse(req.url).query);
  next();
}
