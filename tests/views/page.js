let is = require('is')
let keys = Object.keys
let assign = Object.assign

let tmpl = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">
    <title>${title}</title>
    <link id="css" rel="stylesheet" href="css/main.css" type="text/css">
    <script>
      this.log = console.debug.bind(console);
      document.addEventListener('DOMContentLoaded', e => log('==READY=='), false);
    </script>
    ${scripts.map(s => {

    }).join('\n')}
  </head>
  <body></body>
</html>`


let script = x => `<script src="${x}.js"></script>`
let style = x => `<link rel="stylesheet" type="text/css" href="${x}.css">`


let tag = (name, x, opts) => {

  let o = assign({
    [name]:true
  }, opts||{})


  let attrs = keys(o).map(k => 'boolean'!=typeof o[k] ? `${k}="${o[k]}"` : k).join(' ')

  `<${attrs}>${x}</${name}>`
}

