'use strict';


let rgxParam = /\/:(\w+)/g;

let getRgx = x => new RegExp('^'+x.replace(/\//g,'\\/').replace(rgxParam,'/(\\w+)') + '$');

let getTerms = x => {
    let m = x.match(rgxParam);
    return m && m.map(p=>p.slice(2));
  }

module.exports = function(x) {
  let cb, terms = getTerms(x);
  if(terms) {
    let n = terms.length;
    let rgx = getRgx(x);
    cb = path => {
      let tmp = path.match(rgx);
      if(!tmp)
        return false;

      let buf = {};
      for(let i = 0; i<n; i++)
        buf[terms[i]] = tmp[i+1];
      return buf;
    }
  } else {
    cb = path => x===path;
  }
  return cb;
}
