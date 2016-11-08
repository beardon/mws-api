import {
    COD_SETTINGS,
    CREATE_FULFILLMENT_ORDER_ITEM,
    DELIVERY_WINDOW,
    DESINATION_ADDRESS,
    EMAIL,
    ENUM,
    LIST,
    MARKETPLACE_ID,
    STRING,
    DATETIME
} from '../../../../types';

import {
    FulfillmentAction,
    FulfillmentPolicy,
    ShippingSpeedCategory
} from '../enums';

const required = true;

export default {
    params: {
        MarketplaceId: { type: MARKETPLACE_ID },
        SellerFulfillmentOrderId: { required, type: STRING({ max: 40 }) },
        FulfillmentAction: { type: ENUM(FulfillmentAction) },
        DisplayableOrderId: { required, type: STRING({ min: 1, max: 40 }) }, // TODO: can validate this further
        DisplayableOrderDateTime: { required, type: DATETIME },
        DisplayableOrderComment: { required, type: STRING({ max: 1000 }) },
        ShippingSpeedCategory: { required, type: ENUM(ShippingSpeedCategory) },
        DestinationAddress: { required, type: DESINATION_ADDRESS },
        FulfillmentPolicy: { type: ENUM(FulfillmentPolicy) },
        NotificationEmails: { name: 'NotificationEmailList.member', type: LIST(EMAIL({ max: 64 })) },
        CODSettings: { type: COD_SETTINGS },
        Items: { required, type: LIST(CREATE_FULFILLMENT_ORDER_ITEM) },
        DeliveryWindow: { type: DELIVERY_WINDOW }
    }
};
