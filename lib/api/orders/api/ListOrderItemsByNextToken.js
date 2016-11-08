import {
    STRING
} from '../../../types';

const required = true;

export default {
    params: {
        NextToken: { required, type: STRING }
    },
    data: 'OrderItems.OrderItem',
    isArray: true
};
