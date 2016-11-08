import validator from 'validator';

import AbstractType from './Abstract';

export default class UUIDType extends AbstractType {
    validate() {
        const { value } = this;

        if (!validator.isUUID(value)) {
            throw new TypeError(`Invalid value ${value} for type UUID`);
        }

        return true;
    }
}
