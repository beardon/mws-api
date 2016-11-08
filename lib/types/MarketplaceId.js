import AbstractType from './Abstract';

const validMarketplaceIdRegExp = /^[a-zA-Z0-9]{14}$/;

export default class MarketplaceIdType extends AbstractType {
    validate() {
        const { value } = this;

        const isValidMarketplaceId = validMarketplaceIdRegExp.test(value);

        if (!isValidMarketplaceId) {
            throw new TypeError(`Invalid value ${value} for type MarketplaceId`);
        }

        return true;
    }
}
