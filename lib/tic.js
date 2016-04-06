(function(Units, exports) {
  'use strict';

  let setOp = op => Function(`return (a,b) => a ${op} b;`)(op);
  let isFn  = x => 'function'==typeof x;
  let use = (o,name,fn) => Object.defineProperty(o, name, { configurable: !0, writable:!0, value: fn });

  class Calc extends Array {
    static use(name, op) {
        let fn = isFn(op) ? op : setOp(op);
        use(this.prototype, name, function(...argv) {
            this.push(fn);
            this.push(...argv);
            return this;
          })
        return this;
      }

    valueOf() {
        return this.eq;
      }

    get eq() {
        let buf = 0, op;
        while(this.length) {
          if (isFn(this[0]))
            op = this.shift();
          else
            buf = op(buf, this.shift());
        }
        return buf;
      }

    get hours() {
        this.push((a,b) => a * Units.hours);
      }
  }

  Calc.use('sum', '+');
  Calc.use('sub', '-');
  Calc.use('div', '/');
  Calc.use('mult', '*');

  exports(() => new Calc);

})({
  years: 31556874240, months: 2629739520, days: 86400000, hours: 3600000, min: 60000, sec: 1000, ms: 1
}, this.__defineGetter__.bind(this, 'calc'));

calc.constructor.use('square', (a,b) => b*b);

// let Units = { years: 31556874240, months: 2629739520, days: 86400000, hours: 3600000, min: 60000, sec: 1000, ms: 1}

// noon ,midnight ,today ,tommorow ,yesterday ,ago ,back, forward, before, after, from, to, since, when, then, between, until, last, first, past, backward, earlier

// 'day               d'
// 'date              dt'
// 'millisecond       ms'
// 'minute            min'
// 'month             m'

// 'hour              h'
// 'second            s'
// 'year              y'
// 'week              w'

// Number.prototype.__defineGetter__('days', function() {
//   let n = this;
//   return {
//     ago:
//   }
// })


//    res=0    calc=null  list=[ sum, 1,2,3, sub, 6, 7]
// -------------------------------------------------
// 0: res= 0, calc=sum, list=[ 1,2,3, sub, 6, 7]
// 1: res= 1, calc=sum, list=[ 2,3, sub, 6, 7]
// 2: res= 3, calc=sum, list=[ 3, sub, 6, 7]
// 3: res= 6, calc=sum, list=[ sub, 6, 7]
// 4: res= 6, calc=sub, list=[ 6, 7]
// 5: res= 0, calc=sub, list=[ 7]
// 5: res=-7, calc=sub, list=[]













