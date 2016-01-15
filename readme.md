simple dev server
=================
## create

``` js
let fs = require('fs');
let dev = require('devserver');

let app = dev.server((err, req, res) => {
  res.statusCode = code;
  res.end(err.message);
})
```

## logger

``` js
app.use(dev.logger)

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
app.get('/pub/main.js', dev.brws('./pub/main.js'));


```

## static

``` js
app.get(dev.statiq(__dirname));

```

## listen

``` js
app.listen(3000);
```