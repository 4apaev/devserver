'use strict';
let fs      = require('fs');
let is      = require('is');
let assert = require('assert');
let server  = require('../src/server');
let logger  = require('../middleware/logger')

let txt     = JSON.stringify.bind(JSON)
let statusMap = {200:'200 OK',404: 'Not Found',500:'ERROR'}
let PORT = 3000
fs.readFileSync('./tests/base.html').toString()

server()
  .use(maybe(logger,'logger'))
  .get('/', (req, res, next) => {
    res.statusCode = 200;
    res.end('<h1>ok</h1>')
  })
  .get('/params/:group/all/:id', maybe(params))
  .get('/query', maybe(query))
  .listen(PORT, fin);


function params(req, res, next) {
    next(is.Obj(req.params) ? null : 'req should have "params" field which is an Object')
  }

function query(req, res, next) {
    if(is.not.Obj(req.query))
      return next('req should have query field which is an Object')
    return next('cb'== req.query.callback ? null : 'req.query should have "callback" field equals "cb"')
  }

function maybe(fn, name) {
  name||(name=fn.name)
  return function(req, res, next) {
    req.buf||(req.buf={})
    req.buf[name]||(req.buf[name]=0)
    req.buf[name]+=1
    fn(req, res, next)
  }
}

function fin(err, req, res) {
  let code = err ? 500 : req.buf.query||req.buf.params ? 200 : 404
  res.statusCode = code;

  res.end(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width"><title>Test</title></head>
    <body>
      <h1>${err || statusMap[code]||'SOME ERROR'}</h1>
      <h3>url: ${req.url}</h3>
      <h3>pathname: ${req.pathname}</h3>
      <h3>method: ${req.method}</h3>
      <h3>query: ${txt(req.query, 0, 2)}</h3>
      <h3>params: ${txt(req.params, 0, 2)}</h3>
      <section>${txt(req.buf,0,2)}</section>
    </body></html>`)
}

// let json    = require('../src/json');
// let favicon = require('../src/favicon');
// let statiq  = require('../src/static')(__dirname);