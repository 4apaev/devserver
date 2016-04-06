'use strict';
module.exports = (req, res, next) => {
  res.json = obj => {
    let cb = req.query.callback;
    let mim = 'application/json';
    let data = JSON.stringify(obj, 0, 2);

    if(cb) {
      mim = 'text/javascript';
      data = `${cb}(${data})`;
    }
    res.setHeader('Content-Type', mim);
    res.end(data);
  }
  next();
}
