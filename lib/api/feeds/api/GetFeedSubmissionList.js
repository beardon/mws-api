import {
    DATETIME,
    ENUM,
    LIST,
    INTEGER,
    STRING
} from '../../../types';

import { FeedProcessingStatus, FeedType } from '../enums';

export default {
    params: {
        FeedSubmissionIds: { name: 'FeedSubmissionIdList.Id', type: LIST(STRING) },
        MaxCount: { type: INTEGER({ min: 0 }) },
        FeedTypes: { name: 'FeedTypeList.Type', type: LIST(ENUM(FeedType)) },
        FeedProcessingStatuses: { name: 'FeedProcessingStatusList.Status', type: LIST(ENUM(FeedProcessingStatus)) },
        SubmittedFromDate: { type: DATETIME },
        SubmittedToDate: { type: DATETIME }
    },
    data: 'FeedSubmissionInfo',
    isArray: true
};
