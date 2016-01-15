'use strict';

let Alias = require('../pub/alias')
let mim = new Alias;
let types = require('./types.json');
module.exports = mim.define(types);