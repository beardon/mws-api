import _ from 'lodash';

import AbstractType from './Abstract';

export default class DateTimeType extends AbstractType {
    validate() {
        const { value } = this;

        if (!_.isString(value) && !_.isDate(value)) {
            throw new TypeError(`Invalid value ${value} for type DateTime`);
        }

        if (_.isString(value)) {
            new Date(value);
        }

        return true;
    }

    get() {
        const { value } = this;

        if (_.isString(value)) {
            return (new Date(value)).toISOString();
        }

        return value.toISOString();
    }
}
