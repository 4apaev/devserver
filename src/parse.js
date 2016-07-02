'use strict';
const is = require('is').use('rgx', 'RegExp');
const urlChunk = /\/:(\w+)/g;

module.exports = parse;

function parse(x) {
    return is.str(x) ? matchTerms(x) : is.rgx(x) ? x.test.bind(x) : () => true;
  }

function createRgx(x) {
    return new RegExp('^'+x.replace(/\//g,'\\/').replace(urlChunk,'/(\\w+)') + '$');
  }

function matchTerms(x) {
    let cb, names = getTerms(x);
    if(!names) {
      cb = path => x===path;
    } else {
      let chunkRgx = createRgx(x);
      cb = path => {
        let values = path.match(chunkRgx);
        return values ? matchParams(values, names) : false;
      }
    }
    return cb;
  }

function matchParams(values, names) {
    let params = {};
    for(let i = 0; i < names.length; i++)
      params[names[i]] = values[i+1];
    return params;
  }

function getTerms(x) {
    let match = x.match(urlChunk);
    return match && match.map(chunk => chunk.slice(2));
  }