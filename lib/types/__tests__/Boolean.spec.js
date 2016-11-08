import { expect } from 'chai';

import { BOOLEAN } from '..';

describe('Types', function () {
    describe('Boolean', function () {
        it('should convert truthy values correctly', function () {
            expect(BOOLEAN.create(true).get()).to.equal('true');
            expect(BOOLEAN.create('true').get()).to.equal('true');
            expect(BOOLEAN.create('test').get()).to.equal('true');
        });

        it('should convert falsey values correctly', function () {
            expect(BOOLEAN.create(false).get()).to.equal('false');
            expect(BOOLEAN.create(null).get()).to.equal('false');
        });
    });
});
