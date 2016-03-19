'use strict';
const http = require('http');

let App = {
  parse(x) {
    switch({}.toString.call(x)[8]){
      case 'R': return v => x.test(v); break;
      case 'S': return v => v===x; break;
      case 'A': return v => x.indexOf(v) > -1; break;
      default : return v => !0;
    }},
  use(method, url, cb) {
    this.routes.push({ method: this.parse(method), url: this.parse(url), cb: cb||url||method });
    return this;
  },
  put(url, cb) { return this.use('PUT', url, cb) },
  post(url, cb) { return this.use('POST', url, cb) },
  get(url, cb) { return this.use('GET', url, cb) },
  listen() { return this.server.listen.apply(this.server, arguments)}
}

module.exports = (done) => {
  
  let app = Object.create(App);
  let routes = app.routes = [];
  app.server = http.createServer(queue);

  function queue(req, res) {
    let route, i = -1;
    
    function next(err) {
      if(err||!(route = routes[++i]))
        return done(err, req, res);

      if(!route.method(req.method.toUpperCase()) || !route.url(req.url))
        return next();

      try {
        route.cb.call(app, req, res, next); 
      } catch(err) {
        next(err);
      }
    }

    next();
  }
  return app
}