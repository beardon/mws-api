import { expect } from 'chai';

import { AMAZON_ORDER_ID } from '..';

describe('Types', function () {
    describe('AmazonOrderId', function () {
        it('should correctly validate valid Amazon Order Ids', function () {
            expect(AMAZON_ORDER_ID.create('111-1111111-1111111').validate()).to.equal(true);
        });

        it('should correctly validate invalid Amazon Order Ids', function () {
            expect(() => AMAZON_ORDER_ID.create('111-1111111-111111').validate()).to.throw(TypeError);
            expect(() => AMAZON_ORDER_ID.create('111-1111111-111111A').validate()).to.throw(TypeError);
            expect(() => AMAZON_ORDER_ID.create('11111111111111111').validate()).to.throw(TypeError);
        });
    });
});
