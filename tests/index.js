'use strict';
let fs      = require('fs');
let is      = require('is');
let assert = require('assert');
let server  = require('../src/server');
let logger  = require('../middleware/logger');
let favicon  = require('../middleware/favicon');
let statiq  = require('../middleware/static');

let page = x => (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let p = req.params||{}
    let q = req.query||{}

    res.end(`<h1>${x}</h1>
            <h2>params</h2>
            ${Object.keys(p).map(k=>`<h3>${k} - ${p[k]}</h3>`).join('\n')}
            <h2>query</h2>
            ${Object.keys(q).map(k=>`<h3>${k} - ${q[k]}</h3>`).join('\n')}`);
  }


let app = server();
app.use(logger)
  .get('/favicon.ico', favicon)
  .get('/', page('home'))
  .get('/one', page('one'))
  .get('/two', page('two'))
  .get('/page/:type/:id', page('page'))
  .get(statiq(__dirname))


app.listen(3000, (err, req, res) => {
  res.statusCode = 500;
  app.log('FINALE', err)
  res.end(err ? err.message : err);
});
app.log('up and running on 3000')




// let fail = (err, req, res) => {
//   res.statusCode = 500;
//   res.end(err ? err.message : err);
// }

// let home = (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   fs.createReadStream('./dist/index.html').pipe(res);
// }



// let home = (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   fs.createReadStream(__dirname+'/base.html').pipe(res);
// }
