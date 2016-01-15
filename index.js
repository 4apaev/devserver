'use strict';

let fs = require('fs');
let pkg = require('./package.json');
let server = require('./src/server');
let statiq = require('./src/static')(__dirname);
let brws = require('./src/brws')('./pub/main.js');

let app = server((err, req, res) => {
  res.statusCode = code;
  res.end(err.message);
})

app.use((req, res, next) => {
  let start = new Date
  res.once('finish', () => console.log(start.toLocaleTimeString(), res.statusCode, req.method, req.url, Date.now() - start))
  next()
});

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./view/index.html').pipe(res);
  });

app.get('/pub/main.js', brws);
app.get(statiq);
app.listen(3000);

