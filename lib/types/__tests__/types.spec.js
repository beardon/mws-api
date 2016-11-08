import { expect } from 'chai';

import {
    BOOLEAN,
    DATE,
    ENUM,
    LIST
} from '..';

describe('types', function () {
    // it('should basic type', function () {
    //     expect((new BaseType()).get('a')).to.equal('a');
    // });

    // it('should date', function () {
    //     const type = DATE;

    //     // valid
    //     expect(type.create('2016-01-01').validate()).to.equal(true);
    //     expect(type.create(new Date('2016-01-01')).validate()).to.equal(true);
    //     expect(type.create(new Date(2016, 0, 1)).validate()).to.equal(true);

    //     // invalid
    //     expect(() => type.create().validate()).to.throw(Error);
    //     expect(() => type.create('test').validate()).to.throw(Error);
    // });

    // it('should list', function () {
    //     const type = LIST(BOOLEAN);

    //     expect(type.create([true, false]).get()).to.deep.equal(['true', 'false']);
    //     expect(type.create(true).get()).to.deep.equal(['true']);
    // });

    // it('should nest list', function () {
    //     const type = LIST(LIST(BOOLEAN));

    //     expect(type.create([[true, false], [false]]).get()).to.deep.equal([['true', 'false'], ['false']]);
    // });

    // it('should enum', function () {
    //     const type = ENUM(['TEST', 'ENUM']);

    //     expect(type.create('TEST').get()).to.equal('TEST');
    //     expect(type.create('ENUM').get()).to.equal('ENUM');
    //     expect(() => type.create('NOPE').validate()).to.throw(TypeError);
    // });
});
