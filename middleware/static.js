'use strict';
let Path = require('path');
let fs = require('fs');
let mim = require('./mim/index');

module.exports = (base, maxage=86400000) => (req, res) => {
  
  let file = Path.join(base, req.url);
  
  fs.stat(file, (err, stats) => {
    if (!err && stats.isFile()) {
      
      res.statusCode = 200;
      res.setHeader('Content-Length', stats.size);

      res.setHeader('Cache-Control', `public, max-age=${maxage}`);
      res.setHeader('Expires', new Date(Date.now() + maxage).toUTCString());
      
      res.setHeader('Content-Type', mim.get(x,'plain/text'));
      fs.createReadStream(file).pipe(res);
    }
    else{
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>404 Not Found....</h1>');
    }
  });
}
