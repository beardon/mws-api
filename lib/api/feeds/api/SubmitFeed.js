import {
    BODY,
    BOOLEAN,
    ENUM,
    LIST,
    MARKETPLACE_ID
} from '../../../types';

import { FeedType } from '../enums';

const required = true;
const upload = true;

export default {
    params: {
        FeedContent: { required, type: BODY },
        FeedType: { required, type: ENUM(FeedType) },
        MarketplaceIds: { name: 'MarketplaceIdList.Id', type: LIST(MARKETPLACE_ID) },
        PurgeAndReplace: { type: BOOLEAN }
    },
    upload,
    data: 'FeedSubmissionInfo'
};
