import validator from 'validator';

import AbstractType from './Abstract';

export default class EmailType extends AbstractType {
    validate() {
        const { value } = this;

        if (!validator.isEmail(value)) {
            throw new TypeError(`Invalid value ${value} for type Email`);
        }

        return true;
    }
}
