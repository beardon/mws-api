import AbstractType from './Abstract';

const validASINRegExp = /^[a-zA-Z0-9]{10}$/;

export default class ASINType extends AbstractType {
    validate() {
        const { value } = this;

        const isValidASIN = validASINRegExp.test(value);

        if (!isValidASIN) {
            throw new TypeError(`Invalid value ${value} for type ASIN`);
        }

        return true;
    }
}
