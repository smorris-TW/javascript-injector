"use strict";

const log = require('log4js').getLogger('injector');

const guard = require('./guard');

const glob = require('glob');
const path = require('path');

let container = require('./injector.container');

const injectorRegistrationsGlob = './src/**/*.inject.js';


function autoRegister(injectorRegistrationsGlob) {
    log.info(`searching '${injectorRegistrationsGlob}'`);

    const files = glob.sync(injectorRegistrationsGlob);
    log.info(`${files.length} registrations found`);

    files.forEach(function (file) {
        guard.required({file});

        const component = require(path.resolve(file));
        if (!component.key) {
            throw new Error(`'${file}' does not export 'key'`);
        }
        if (!component.factory) {
            throw new Error(`'${file}' does not export 'factory'`);
        }

        container.register(component.key, component.dependencyKeys, component.factory, true);
    });

    return container;
}

autoRegister(injectorRegistrationsGlob);

module.exports = container;