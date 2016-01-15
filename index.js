module.exports.server = require('./src/server');
module.exports.statiq = require('./src/static')(__dirname);
module.exports.brws = require('./src/brws')('./pub/main.js');