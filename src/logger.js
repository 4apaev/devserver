'use strict';
module.exports = (req, res, next) => {
  let start = new Date;
  res.once('finish', () => console.log(start.toLocaleTimeString(), res.statusCode, req.method, req.url, Date.now() - start));
  next()
}