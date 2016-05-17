'use strict';
const http = require('http');
let query = require('./../middleware/query');
let parse = require('./parse');
let fin = require('./fin');




class App {
  constructor() {
      this.routes = [];
    }

  push(cb, pass) {
      cb = cb.bind(this);
      cb.pass = pass;
      this.routes.push(cb);
      return this;
    }

  use(method, url, cb) {
      let parseMethod = parse(method);
      let parseUrl = parse(url);
      return this.push(cb || url || method, req => parseMethod(req.method) && (req.params = parseUrl(req.pathname)));
    }

  post(url, cb) {
      return this.use('POST', url, cb);
    }
  get(url, cb)  {
      return this.use('GET', url, cb);
    }

  listen(port, done=fin) {
      this.server = http.createServer((req, res) => App.queue(req, res, done, this.routes, -1));
      return this.server.listen(port);
    }

  static queue(req, res, done, routes, i) {
      query(req, res, next);
      function next(err) {
        setTimeout(route => {
          if(err || !route) {
            done(err, req, res);
          } else if(route.pass(req)) {
            try {
              route(req, res, next);
            } catch(err) {
              next(err);
            }} else {
            next();
          }}, 0, routes[++i]);
      }}
}

module.exports = () => new App;
