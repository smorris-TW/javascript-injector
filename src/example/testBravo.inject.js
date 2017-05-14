"use strict";

const name = 'testBravo';
const Constructor = require(`./${name}`);  // CAUTION: can this still be bundled?

module.exports.key = name;
module.exports.dependencyKeys = ['log', 'testAlpha'];

module.exports.factory = function({ context, dependencies }){
  return new Constructor (dependencies);
};
