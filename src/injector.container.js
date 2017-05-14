"use strict";
const logService = require('log4js');
const log = logService.getLogger('injector.container');

const guard = require('./guard');


const registrations = {
  "logService": {
    factoryMethod: function () {
      return logService;
    }
  }
};

function resolve(key) {
  log.trace('resolve', key);

  // auto log for all!
  if (key === "log") {
    return logService.getLogger(key);
  }

  const componentInfo = registrations[key];
  if (!componentInfo) throw new Error(`Component not registered: '${key}'`);

  let dependencies = {};

  const dependencyKeys = componentInfo.dependencyKeys || [];
  dependencyKeys.forEach(dependencyKey => {
    dependencies[dependencyKey] = resolve(dependencyKey);
  });

  const component = componentInfo.factoryMethod({context: this, dependencies});
  return component;
}

function register(key, dependencyKeys, factoryMethod, autoRegistered) {
  guard.required({key});
  log.debug('registering', key);

  guard.required({dependencyKeys});
  guard.required({factoryMethod});

  registrations[key] = {
    factoryMethod,
    dependencyKeys,
    autoRegistered: autoRegistered || false
  };
}

module.exports = {
  resolve,
  register,
  _registrations: registrations
};

