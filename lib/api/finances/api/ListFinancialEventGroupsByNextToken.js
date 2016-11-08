import {
    STRING
} from '../../../types';

const isArray = true;
const required = true;

export default {
    params: {
        NextToken: { required, type: STRING }
    },
    data: 'FinancialEventGroupList.FinancialEventGroup',
    isArray
};
