'use strict';
let types = require('./types.json');
class Mim {
  constructor(a,b) {
    this.attrs = Object.create(null);
    a && this.set(a,b);
  }
  alias(a,b) {
    for(let i=0; i < b.length; i++)
      this.set(b[i], a)
    return this;
  }
  define(map) {
    for(let a in map)
      this.alias(a, map[a])
    return this;
  }
  get(x, def) {
    return this.attrs[x.split('.').pop()]||def;
  }
  set(a,b) {
    if('object'===typeof a)
      for(let k in a)
        this.set(k, a[k]);
    else
      a && (this.attrs[a] = b);
    return this;
  }
  is(x) {
    return this.get(x,'').split('/')[0]
  }
  isApp(x)  { return 'application'==this.is(x) }
  isText(x) { return 'text'  == this.is(x) }
  isFont(x) { return 'font'  == this.is(x) }
  isAudio(x){ return 'audio' == this.is(x) }
  isVideo(x){ return 'video' == this.is(x) }
  isImage(x){ return 'image' == this.is(x) }
}

let mim = new Mim;
mim.define(types);
module.exports = mim;