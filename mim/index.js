'use strict';

let Alias = require('../pub/alias');
let types = require('./types.json');

class Mim extends Alias {
  get(x, def) {
    let ext = x.split('.').pop()
    return this.attrs[ext]||def;
  }
  is(x)     { return this.get(x,'').split('/')[0]}
  isApp(x)  { return 'application'===this.is(x) }
  isText(x) { return 'text'  === this.is(x) }
  isFont(x) { return 'font'  === this.is(x) }
  isAudio(x){ return 'audio' === this.is(x) }
  isVideo(x){ return 'video' === this.is(x) }
  isImage(x){ return 'image' === this.is(x) }
}

let mim = new Mim;
mim.define(types);
module.exports = mim;