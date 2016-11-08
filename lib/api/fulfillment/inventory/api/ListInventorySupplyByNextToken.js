import {
    STRING
} from '../../../../types';

const isArray = true;

export default {
    params: {
        NextToken: { required, type: STRING }
    },
    data: 'InventorySupplyList',
    isArray
};
