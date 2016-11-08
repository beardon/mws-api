import {
    ComplexType,
    AMAZON_ORDER_ITEM_ID,
    INTEGER
} from '../../../types';

const required = true;

export default class ItemType extends ComplexType {
    definition = {
        OrderItemId: { required, type: AMAZON_ORDER_ITEM_ID },
        Quantity: { required, type: INTEGER }
    }
}
