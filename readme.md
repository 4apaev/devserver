simple dev server
=================
## create

``` js
let fs = require('fs');
let dev = require('devserver');

let app = dev.server(dev.fail)
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
    fs.createReadStream('./index.html').pipe(res);
  });
```

## static

``` js
app.get(dev.statiq(__dirname));

```

## listen

``` js
app.listen(3000);