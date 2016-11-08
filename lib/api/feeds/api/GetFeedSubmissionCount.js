import {
    DATETIME,
    ENUM,
    LIST
} from '../../../types';

import { FeedProcessingStatus, FeedType } from '../enums';

export default {
    params: {
        FeedTypes: { name: 'FeedTypeList.Type', type: LIST(ENUM(FeedType)) },
        FeedProcessingStatuses: { name: 'FeedProcessingStatusList.Status', type: LIST(ENUM(FeedProcessingStatus)) },
        SubmittedFromDate: { type: DATETIME },
        SubmittedToDate: { type: DATETIME }
    },
    data: 'Count'
};
