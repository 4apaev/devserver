## setup

``` js
let fs = require('fs');

let server = require('./src/server');
let statiq = require('./src/static')(__dirname);
let brws = require('./src/brws')('./pub/main.js');
```

## create

``` js
let app = server((err, req, res) => {
  res.statusCode = code;
  res.end(err.message);
})
```

## logger

``` js
app.use((req, res, next) => {
  let start = new Date
  res.once('finish', () => console.log(start.toLocaleTimeString(), res.statusCode, req.method, req.url, Date.now() - start))
  next()
});
```

## render

``` js
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./view/index.html').pipe(res);
  });
```

## browserify

``` js
app.get('/pub/main.js', brws);
```

## static

``` js
app.get(statiq);
```

## listen
``` js
app.listen(3000);
```