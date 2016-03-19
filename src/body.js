'use strict';

module.exports = (req, res, next) => {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      req.body = JSON.parse(body);
    } catch(e) {
      res.statusCode = 400;
      return res.end(e.message);
    }
    next()
  })
}