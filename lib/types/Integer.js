import validator from 'validator';

import AbstractType from './Abstract';

export default class IntegerType extends AbstractType {
    validate() {
        const [{ max = Infinity, min = -Infinity }] = this.args;
        const { value } = this;

        if (!validator.isInt(value, { min, max })) {
            throw new TypeError(`Invalid value ${value} for type Integer`);
        }

        return true;
    }

    get() {
        const { value } = this;

        return String(Number(value));
    }
}
