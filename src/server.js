'use strict';
const http = require('http');
let query = require('./../middleware/query');
let parse = require('./parse');

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

  listen(port, done) {
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

module.exports = () => {
  let app = Object.create(App);
    app.routes = [];
    app.log = log;
    return new App;
  }

// function queue(req, res, done, routes, i) {
//   query(req, res, next);
//   function next(err) {
//     setTimeout(route => {
//       if(err || !route) {
//         done(err, req, res);
//       } else if(route.pass(req)) {
//         try {
//           route(req, res, next);
//         } catch(err) {
//           next(err);
//         }} else {
//             next();
//           }
//     }, 0, routes[++i]);
//   }
// }
//
// module.exports = () => {
//   let app = Object.create(App);
//   app.routes = [];
//   return app;
// }
//
//
//
// let App = {
//   push(cb, pass) {
//     cb = cb.bind(this);
//     cb.pass = pass;
//     this.routes.push(cb);
//     return this;
//   },
//
//   use(method, url, cb) {
//     let m = parse(method);
//     let u = parse(url);
//     return this.push(cb || url || method, req => m(req.method) && (req.params = u(req.pathname)));
//   },
//
//   post(url, cb) {
//     return this.use('POST', url, cb);
//   },
//   get(url, cb)  {
//     return this.use('GET', url, cb);
//   },
//
//   listen(port, done) {
//     let server = http.createServer((req, res) => queue(req, res, done, this.routes, -1));
//     return server.listen(port);
//   }
// }
