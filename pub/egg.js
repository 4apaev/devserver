'use strict';

class Egg {
  constructor(a,b) {
      this.attrs = Object.create(null);
      a && this.set(a,b);
    }
  has(x) {
      return x in this.attrs;
    }
  get(x) {
      return this.attrs[x];
    }
  set(a,b) {
      if('object'===typeof a)
        for(let k in a)
          this.set(k, a[k]);
      else
        a && (this.attrs[a] = b);
      return this;
    }
  keys() {
      return Object.keys(this.attrs)
    }
  each(fn, ctx) {
      for(let k in this.attrs)
        fn.call(ctx, this.attrs[k], k);
      return this;
    }
}

module.exports = Egg;