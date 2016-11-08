import {
    AMAZON_ORDER_ID
} from '../../../types';

const required = true;

export default {
    params: {
        AmazonOrderId: { required, type: AMAZON_ORDER_ID }
    },
    data: 'OrderItems.OrderItem',
    isArray: true
};
