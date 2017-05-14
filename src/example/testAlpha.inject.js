"use strict";

const name = 'testAlpha';
const Constructor = require(`./${name}`);  // CAUTION: can this still be bundled?

module.exports.key = name;
module.exports.dependencyKeys = [];

module.exports.factory = function({ context, dependencies }){
  return new Constructor(dependencies);
};
