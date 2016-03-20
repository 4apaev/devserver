'use strict';
let types = require('./types.json');
class Mim {
  constructor(a,b) {
    this.attrs = Object.create(null);
    a && this.set(a,b);
  }
  alias(a,b) {
    for(let i=0; i < b.length; i++)
      this.set(b[i], a);
    return this;
  }
  get(x, def) {
    return this.attrs[x.split('.').pop()]||def;
  }
  set(a,b) {
    Object.assign(this.attrs, 'object'===typeof a ? a : {[a]:b});
    return this;
  }
  is(x) {
    return this.get(x,'').split('/')[0]
  }
}

let mim = new Mim;
Object.keys(types).forEach(t => mim.alias(t, types[t]));
module.exports = mim;