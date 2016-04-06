'use strict';
let Time = require('../lib/time')

module.exports = (req, res, next) => {
  let date = new Time;
  res.once('finish', () =>
           console.log(date.format('Day date Month hours:min:sec'),
                      res.statusCode,
                      req.method,
                      req.url,
                      `${date.diff}ms`))
  next();
}

