'use strict';

let matchParams = require('./params');

module.exports = function parse(x) {
  return x && 'String'===x.constructor.name ? matchParams(x) : ()=>true
  // let cb;
  // switch (x.constructor.name) {
  //   case 'String'   : cb=matchParams(x); break;
  //   case 'RegExp'   : cb=x.test.bind(x); break;
  //   case 'Array'    :
  //     let list = x.map(parse);
  //     cb = v => list.some(fn => fn(v)); break;
  //   default: cb =()=>true;
  // }
  // return cb;
}