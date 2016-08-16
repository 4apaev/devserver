'use strict';

module.exports = (req, res, next) => {
  let body = '';
  let isJson = 'application/json' == req.headers['content-type']
  req.setEncoding('utf8');
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      req.body = isJson ? JSON.parse(body) : body;
      next();
    } catch(e) {
      res.statusCode = 400;
      res.end(e.toString());
    }
  });
}