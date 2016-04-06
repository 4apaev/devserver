'use strict';
module.exports = (req, res, next) => {

  let start = new Date;
  res.once('finish', () => {
    // start.toLocaleTimeString(),
    console.log(new Date - start,
                ' | ',
                start.toLocaleTimeString(),
                res.statusCode,
                req.method,
                req.url)
  });
  next();
}
