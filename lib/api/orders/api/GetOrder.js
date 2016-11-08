import {
    AMAZON_ORDER_ID,
    LIST
} from '../../../types';

const required = true;

export default {
    params: {
        AmazonOrderIds: { name: 'AmazonOrderId.Id', type: LIST(AMAZON_ORDER_ID, { max: 50 }) }
    },
    data: 'Orders.Order',
    isArray: true
};
