import {
    ENUM,
    LIST,
    MARKETPLACE_ID,
    STRING
} from '../../../../types';

import { ResponseGroup } from '../enums';

const isArray = true;

export default {
    params: {
        SellerSKUs: { name: 'SellerSkus.member', type: LIST(STRING, { max: 50 }) },
        QueryStartDateTime: { type: DATETIME },
        ResponseGroup: { type: ENUM(ResponseGroup) },
        MarketplaceId: { type: MARKETPLACE_ID }
    },
    validate() {
        // TODO

        return true;
    },
    data: 'InventorySupplyList',
    isArray
};
