import _ from 'lodash';

import AbstractType from './Abstract';

export default class EnumType extends AbstractType {
    constructor(value, members) {
        super();
        this.value = value;
        this.members = members;
    }

    validate() {
        const { members, value } = this;

        if (!_.includes(members, value)) {
            throw new TypeError(`Invalid value ${value} for type EnumType(${members.join(', ')})`);
        }

        return true;
    }
}
