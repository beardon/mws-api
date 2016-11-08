import _ from 'lodash';

import AbstractType from './Abstract';

export default class DateType extends AbstractType {
    validate() {
        const { value } = this;

        if (!_.isString(value) && !_.isDate(value)) {
            throw new TypeError(`Invalid value ${value} for type Date`);
        }

        if (_.isString(value)) {
            new Date(value);
        }

        return true;
    }

    get() {
        const { value } = this;

        if (_.isString(value)) {
            return (new Date(value)).toISOString().slice(0, 10);
        }

        return value.toISOString().slice(0, 10);
    }
}
