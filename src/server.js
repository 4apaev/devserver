'use strict';
const http = require('http');
class App {
  constructor() {
      this.routes = [];
    }
  use(url, cb) { return App.use.call(this, '*', url, cb) }
  post(url, cb) { return App.use.call(this, 'post', url, cb) }
  get(url, cb) { return App.use.call(this, 'get', url, cb) }

  listen(port) {
    this.server.listen(port)
    return this
  }

  static use(method, url, cb) {
      this.routes.push({
        method: method.toUpperCase(),
        url: cb ? url : '*',
        cb: cb||url
      });
      return this
    }

  static pass(a, b) {
      return ['method','url'].every(x => '*'===a[x] || a[x]===b[x])
    }

  static queue(app, req, res, done){
    let route, i = -1;

    function next(err) {
      if(err||!(route = app.routes[++i]))
        return done(err, req, res);
      if(!App.pass(route, req))
        return next();
      try {
        route.cb.call(app, req, res, next);
      } catch(err) {
          next(err);
        }
    }
    next();
  }
}

module.exports = cb => {
  let app = new App
  app.server = http.createServer((req, res) => App.queue(app, req, res, cb))
  return app
}


