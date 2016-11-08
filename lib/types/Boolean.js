import AbstractType from './Abstract';

export default class BooleanType extends AbstractType {
    get() {
        const { value } = this;

        return String(Boolean(value));
    }
}
