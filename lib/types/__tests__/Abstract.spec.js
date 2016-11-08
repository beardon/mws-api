import { expect } from 'chai';

import AbstractType from '../Abstract';

describe('Types', function () {
    describe('Abstract', function () {
        it('should set value', function () {
            expect(new AbstractType('value')).to.have.property('value', 'value');
        });

        it('should set args', function () {
            expect(new AbstractType('value', 'arg1', 'arg2')).to.have.property('args').to.deep.equal(['arg1', 'arg2']);
        });

        it('should always validate', function () {
            expect(new AbstractType('value').validate()).to.equal(true);
        });

        it('should get value', function () {
            expect(new AbstractType('value').get()).to.equal('value');
        });
    });
});
