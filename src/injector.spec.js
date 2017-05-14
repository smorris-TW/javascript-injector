"use strict";
const log = require('log4js').getLogger('injector.spec');


const _ = {
  filter: require('lodash.filter')
};

describe('injector', function () {

  let injector;
  beforeEach(() => {
    injector = require('./injector');
  });

  it('can discover registrations', () => {
    const list = _.filter(injector._registrations, item => {
      return item.autoRegistered === true;
    });
    expect(list.length).to.equal(2);
  });

  it('can resolve all discovered registrations', () => {
    let keys = Object.keys(injector._registrations);
    keys.forEach(key => {
      let component = injector.resolve(key);
      expect(component, `resolving '${key}' failed`).to.not.be.defined;
    });
  });

  it('demos a function invocation on a resolved second-order component', () => {
    log.info('demo, watch the logs!');
    let testBravo = injector.resolve('testBravo');
    testBravo.doBravo();
  });

});
