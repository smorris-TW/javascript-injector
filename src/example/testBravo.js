"use strict";

function TestBravo({ log, testAlpha }) {

  function doBravo() {
    console.log('doBravo()');
    log.debug('calling testAlpha.doAlpha()');
    testAlpha.doAlpha();
  }

  return { doBravo };
}

module.exports = TestBravo;
