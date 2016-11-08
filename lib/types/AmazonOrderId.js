import AbstractType from './Abstract';

const validAmazonOrderIdRegExp = /^\d{3}-\d{7}-\d{7}$/;

export default class AmazonOrderIdType extends AbstractType {
    validate() {
        const { value } = this;

        const isValidAmazonOrderId = validAmazonOrderIdRegExp.test(value);

        if (!isValidAmazonOrderId) {
            throw new TypeError(`Invalid value ${value} for type AmazonOrderId`);
        }

        return true;
    }
}
