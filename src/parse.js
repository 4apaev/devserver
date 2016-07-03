'use strict';
const is = require('is').use('rgx', 'RegExp');
const urlChunk = /\/:(\w+)/g;
const yep = () => true

module.exports = x => is.str(x) ? matchTerms(x) : is.rgx(x) ? x.test.bind(x) : yep;

function matchTerms(x, terms, cb) {
    if(terms = getTerms(x)) {
      let rgx = new RegExp('^'+x.replace(urlChunk,'/(\\w+)') + '$');
      cb = path => {
        let values = path.match(rgx);
        return values ? setParams(values, terms) : false;
      }
    }
    return cb || (cb = path => x === path);
  }

function setParams(values, terms, params = {}) {
    for(let i = 0; i < terms.length; i++)
      params[terms[i]] = values[i+1];
    return params;
  }

function getTerms(x) {
    let match = x.match(urlChunk);
    return match && match.map(chunk => chunk.slice(2));
  }