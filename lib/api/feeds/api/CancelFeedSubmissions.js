import {
    DATETIME,
    ENUM,
    LIST,
    STRING
} from '../../../types';

import { FeedType } from '../enums';

export default {
    params: {
        FeedSubmissionIds: { name: 'FeedSubmissionIdList.Id', type: LIST(STRING) },
        FeedTypes: { name: 'FeedTypeList.Type', type: LIST(ENUM(FeedType)) },
        SubmittedFromDate: { type: DATETIME },
        SubmittedToDate: { type: DATETIME }
    },
    data: 'FeedSubmissionInfo'
};
