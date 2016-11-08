import {
    INTEGER,
    DATETIME
} from '../../../types';

const isArray = true;
const required = true;

export default {
    params: {
        MaxResultsPerPage: { type: INTEGER({ min: 1, max: 100 }) },
        FinancialEventGroupStartedAfter: { required, type: DATETIME },
        FinancialEventGroupStartedBefore: { type: DATETIME }
    },
    validate() {
        // TODO
        return true;
    },
    data: 'FinancialEventGroupList.FinancialEventGroup',
    isArray
};
