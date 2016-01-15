'use strict';
let Egg = require('./egg')

class Alias extends Egg {
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
}

module.exports = Alias;