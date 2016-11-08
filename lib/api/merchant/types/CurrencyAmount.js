import {
    ComplexType,
    DECIMAL,
    ISO_4217
} from '../../../types';

const required = true;

export default class CurrencyAmountType extends ComplexType {
    definition = {
        CurrencyCode: { required, type: ISO_4217 },
        Amount: { required, type: DECIMAL }
    }
}
