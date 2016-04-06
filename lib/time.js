'use strict';
let weekdays = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
let months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')
let Units = {         // DM = 30.4368
  year: 31556874240, // 12*DM*24*60*60*1000,
  month: 2629739520, // DM*24*60*60*1000,
  date: 86400000,   //  24*60*60*1000
  hours: 3600000,  // 60*60*1000
  min: 60000,
  sec: 1000,
  ms: 1}

let ks = Object.keys(Units);

class Time extends Date {

  format(tmpl) {
      return tmpl.match(/\w+/g)
                 .reduce((buf, x) =>
                    buf.replace(x, this[x]), tmpl);
    }

  get year()  { return this.getUTCFullYear() }
  get month() { return this.getMonth() }
  get day()   { return this.getDay() }
  get date()  { return this.getDate() }
  get hours() { return this.getHours() }
  get min()   { return this.getMinutes() }
  get sec()   { return this.getSeconds() }
  get ms()    { return this.getMilliseconds() }
  get Day()   { return weekdays[this.day] }
  get Month() { return months[this.month] }

  get now()  { return Time.now() }
  get diff() { return this.now - this }

  static sanitize(u,x) {
    let s= (x + ' ' + u).replace(/date/, 'day')
    return x>1 ? s.replace(/year|month|day/, '$&s') : s.replace(/hours/, 'hour')
  }

  static convert(x, u='date', buf=[]) {
    if(u in Units) {
      let n = x/Units[u]
      let left = ~~n
      let right = (x - (Units[u]*left))
      left && buf.push(Time.sanitize(u, left));
      if(right)
        return Time.convert(right, ks[ks.indexOf(u)+1], buf);
    }
    return buf.join(', ')
  }
}

module.exports = Time