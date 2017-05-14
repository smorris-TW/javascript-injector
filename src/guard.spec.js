"use strict";

const guard = require('./guard');


describe('guard', function () {

    describe('isRequired', () => {

        it('passes when arg is specified', () => {
            function shouldNotThrow() {
                guard.required({ a: 'value' });
            }
            expect(shouldNotThrow).to.not.throw();
        });

        it('throws when arg is not specified', () => {
            function shouldThrow() {
                let undefinedArg;
                guard.required({ undefinedArg} );
            }
            expect(shouldThrow).to.throw();
        });
    });

});