'use strict';
let Path = require('path')
let fs = require('fs')
let mim = require('../mim')

module.exports = base => (req, res) => {
    let x = Path.join(base, req.url)
    fs.stat(x, (err, s) => {
      if(!err && s.isFile()){
        res.statusCode = 200;
        res.setHeader('Content-Type', mim.get(Path.extname(x).slice(1))||'plain/text');
        fs.createReadStream(x).pipe(res);
      }
      else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'plain/text')
        res.end('404 Not Found\n');
      }
    })
  }
