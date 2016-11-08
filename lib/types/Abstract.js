/* eslint-disable consistent-return, class-methods-use-this */

export default class AbstractType {
    constructor(value, ...args) {
        this.value = value;
        this.args = args;
    }

    getParam(paramName, ...args) {
        return {
            [paramName]: this.get(...args)
        };
    }

    get() {
        const { validate, value } = this;

        if (validate()) {
            return value;
        }
    }


    validate() {
        return true;
    }
}
