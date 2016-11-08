import {
    STRING
} from '../../../types';

const required = true;
const isArray = true;

export default {
    params: {
        NextToken: { required, type: STRING }
    },
    data: 'FinancialEvents',
    isArray
};
