import _ from 'lodash';

import { toArray } from '../util';
import AbstractType from './Abstract';

export default class ListType extends AbstractType {
    constructor(value, SubType, ...args) {
        super();

        this.value = _.map(toArray(value), (v) => SubType.create(v));
        this.args = args;
    }

    getParam(paramName, ...args) {
        return _.reduce(
            this.get(...args),
            (m, v, i) => ({ ...m, [`${paramName}.${i + 1}`]: v }),
            {}
        );
    }

    get() {
        const { value } = this;

        return _.invokeMap(value, 'get');
    }
}
