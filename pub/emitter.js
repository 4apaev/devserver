'use strict';

class Emitter {
  constructor() {
      this.vents = Object.create(null);
    }

  on(type, fx, ctx) {
      (this.vents[type]||(this.vents[type]=[])).push({fx: fx,ctx: ctx });
      return this;
    }

  off(type, fx) {
      if(!fx)
        return (type ? delete this.vents[type] : this.vents={}), this;
      let x,i=-1,arr = this.vents[type]||[];
      while(x=arr[++i])
        fx===x.fx && arr.splice(i, 1);
      return this;
    }

  emit(type, ...argv) {
      let x,i=-1,arr=this.vents[type]||[];
      while(x=arr[++i])
        x.fx && x.fx.apply(x.ctx, argv);
      return this;
    }
}


module.exports = Emitter;