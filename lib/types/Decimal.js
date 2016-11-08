import AbstractType from './Abstract';

export default class DecimalType extends AbstractType {
    validate() {
        const [{ max = Infinity, min = -Infinity }] = this.args;
        const { value } = this;
        const number = Number(value);

        if (Number.isNaN(number) || !Number.isInteger(number) || number > max || number < min) {
            throw new TypeError(`Invalid value ${value} for type Decimal`);
        }

        return true;
    }

    get() {
        const { value } = this;

        return String(Number(value));
    }
}
