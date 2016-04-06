'use strict';
// accepts
// co
// composition
// content-disposition
// content-type
// cookies
// debug
// delegates
// destroy
// error-inject
// escape-html
// fresh
// http-assert
// http-errors
// koa-compose
// koa-is-json
// mime-types
// on-finished
// only
// parseurl
// statuses
// type-is
// vary


let Url = require('url');
let qs = require('querystring');

let contentType = require('content-type');

let parse = require('parseurl');
let typeis = require('type-is');
let fresh = require('fresh');


let stringify = Url.format;
let assign = Object.assign;


  assign(req, )
  req.query = qs.parse(req.query);
  next();
}


module.exports = {
  setUrl: function() {
    let u = Url.parse(this.req.url)
    let q = qs.parse(u.query)

    this.protocol  = u.protocol  || ''  // : 'https:',
    this.slashes   = u.slashes   || ''  // : true,
    this.auth      = u.auth      || ''  // : null,
    this.host      = u.host      || ''  // : 'github.com',
    this.port      = u.port      || ''  // : null,
    this.hostname  = u.hostname  || ''  // : 'github.com',
    this.hash      = u.hash      || ''  // : null,
    this.search    = u.search    || ''  // : null,
    this.query     = u.query     || ''  // : null,
    this.pathname  = u.pathname  || ''  // : '/koajs/koa/blob/master/lib%2Frequest.js',
    this.path      = u.path      || ''  // : '/koajs/koa/blob/master/lib%2Frequest.js',
    this.href      = u.href      || ''  // : 'https://github.com/koajs/koa/blob/master/lib%2Frequest.js'
  },

  get header()   { return this.req.headers },
  get headers()  { return this.req.headers },
  get url()      { return this.req.url },

  get origin() { return this.protocol + '://' + this.host },

  get href() { return /^https?:\/\//i.test(this.originalUrl) ? this.originalUrl : this.origin + this.originalUrl },
  get method() { return this.req.method; },
  get path() { return parse(this.req).pathname; },
  set url(val) { this.req.url = val },
  set method(val) { this.req.method = val },

  set path(path) {
    let url = parse(this.req);
    if (url.pathname === path)
      return;
    url.pathname = path;
    url.path = null;
    this.url = stringify(url);
  },

  get query() {
    let str = this.querystring;
    let c = this._querycache = this._querycache || {};
    return c[str] || (c[str] = qs.parse(str));
  },

  set query(obj) {
    this.querystring = qs.stringify(obj);
  },

  get querystring() {
    return this.req ? parse(this.req).query||'':''
  },

  set querystring(str) {
    let url = parse(this.req);
    if (url.search === '?' + str) return;
    url.search = str;
    url.path = null;
    this.url = stringify(url);
  },

  get search() {
    return this.querystring ? '?' + this.querystring : '';
  },

  set search(str) {
    this.querystring = str;
  },

  get host() {
    let proxy = this.app.proxy;
    let host = proxy && this.get('X-Forwarded-Host');
    host = host || this.get('Host');
    if (!host) return '';
    return host.split(/\s*,\s*/)[0];
  },

  get hostname() {
    let host = this.host;
    if (!host) return '';
    return host.split(':')[0];
  },

  get idempotent() {
    let methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
    return !!~methods.indexOf(this.method);
  },

  get socket() {
    return this.req.socket;
  },

  get charset() {
    let type = this.get('Content-Type');
    if (!type) return '';
    return contentType.parse(type).parameters.charset || '';
  },

  get length() {
    let len = this.get('Content-Length');
    if (len == '') return;
    return ~~len;
  },

  get protocol() {
    let proxy = this.app.proxy;
    if (this.socket.encrypted) return 'https';
    if (!proxy) return 'http';
    let proto = this.get('X-Forwarded-Proto') || 'http';
    return proto.split(/\s*,\s*/)[0];
  },

  get secure() {
    return 'https' == this.protocol;
  },

  get ip() {
    return this.ips[0] || this.socket.remoteAddress || '';
  },

  get ips() {
    let proxy = this.app.proxy;
    let val = this.get('X-Forwarded-For');
    return proxy && val
      ? val.split(/\s*,\s*/)
      : [];
  },

  get subdomains() {
    let offset = this.app.subdomainOffset;
    return (this.host || '')
      .split('.')
      .reverse()
      .slice(offset);
  },




  accepts: function(){
    return this.accept.types.apply(this.accept, arguments);
  },

  acceptsEncodings: function(){
    return this.accept.encodings.apply(this.accept, arguments);
  },

  acceptsCharsets: function(){
    return this.accept.charsets.apply(this.accept, arguments);
  },

  acceptsLanguages: function(){
    return this.accept.languages.apply(this.accept, arguments);
  },

  is: function(types){
    if (!types) return typeis(this.req);
    if (!Array.isArray(types)) types = [].slice.call(arguments);
    return typeis(this.req, types);
  },

  get type() {
    let type = this.get('Content-Type');
    return type ? type.split(';')[0] : '';
  },

  get: function(field){
    let req = this.req;
    switch (field = field.toLowerCase()) {
      case 'referer':
      case 'referrer':
        return req.headers.referrer || req.headers.referer || '';
      default:
        return req.headers[field] || '';
    }
  },

  inspect: function() {
    return this.req && this.toJSON();
  },

  toJSON: function(){
    return { method: this.method, url: this.url, header: this.header}
  }
}
