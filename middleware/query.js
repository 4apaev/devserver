'use strict';
let Url = require('url');
let Parse = require('querystring').parse;

module.exports = (req, res, next) => {
  Object.assign(req, Url.parse(req.url))
  req.query = Parse(req.query);
  next();
}
