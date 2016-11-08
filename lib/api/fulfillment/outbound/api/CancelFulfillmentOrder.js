import {
    STRING
} from '../../../../types';

const required = true;

export default {
    params: {
        SellerFulfillmentOrderId: { required, type: STRING({ max: 40 }) }
    }
};
