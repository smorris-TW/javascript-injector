"use strict";

describe('injector.container', function () {

    let container;
    beforeEach(() => {
        container = require('./injector.container');
    });

    it('can resolve a first-order component', () => {
        container.register("componentA", [], () => {
            return {message: "componentA message"};
        });

        const actual = container.resolve('componentA');
        expect(actual.message).to.equal('componentA message');
    });

    it('can resolve a second-order component', () => {
        container.register("componentA", [], () => {
            return {message: "componentA message"};
        });

        container.register("componentB", [], ({ context }) => {
            return {
                message: "componentB message",
                dependency: context.resolve("componentA")
            };
        });

        const actual = container.resolve('componentB');
        expect(actual).to.be.ok;
        expect(actual.message).to.equal('componentB message');
        expect(actual.dependency.message).to.equal('componentA message');
    });

});
