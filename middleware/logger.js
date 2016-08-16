'use strict';
let convert = require('readdate')
let up = new Date;
module.exports = (req, res, next) => {
  let start = new Date;
  res.once('finish', () => {
    let now = Date.now();
    console.log(start.toLocaleTimeString('en-us', { hour12: false }),
      res.statusCode,
      req.method,
      req.url,
      ' | up for', convert(now-up))
  });
  next();
}

