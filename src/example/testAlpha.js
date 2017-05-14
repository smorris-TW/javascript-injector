"use strict";

function TestAlpha() {

  function doAlpha() {
    console.log('doAlpha()');
  }

  return { doAlpha };
}

module.exports = TestAlpha;
