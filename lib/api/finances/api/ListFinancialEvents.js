import {
    AMAZON_ORDER_ID,
    INTEGER,
    STRING,
    DATETIME
} from '../../../types';

// TODO: how do we handle pagination of this call correctly? Seems like a special case.
// http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEvents.html
export default {
    params: {
        MaxResultsPerPage: { type: INTEGER({ min: 1, max: 100 }) },
        AmazonOrderId: { type: AMAZON_ORDER_ID },
        FinancialEventGroupId: { type: STRING },
        PostedAfter: { type: DATETIME },
        PostedBefore: { type: DATETIME }
    },
    validate() {
        // TODO
        return true;
    },
    data: 'FinancialEvents'
};
