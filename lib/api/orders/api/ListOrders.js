import {
    AMAZON_ORDER_ID,
    EMAIL,
    ENUM,
    INTEGER,
    LIST,
    MARKETPLACE_ID,
    STRING,
    DATETIME
} from '../../../types';

import { FulfillmentChannel, OrderStatus, PaymentMethod, TFMShipmentStatus } from '../enums';

const required = true;

export default {
    params: {
        BuyerEmail: { type: EMAIL },
        CreatedAfter: { type: DATETIME },
        CreatedBefore: { type: DATETIME },
        FulfillmentChannels: { name: 'FulfillmentChannel.Channel', type: LIST(ENUM(FulfillmentChannel)) },
        LastUpdatedAfter: { type: DATETIME },
        LastUpdatedBefore: { type: DATETIME },
        MarketplaceIds: { required, name: 'MarketplaceId.Id', type: LIST(MARKETPLACE_ID, { max: 50 }) },
        MaxResultsPerPage: { type: INTEGER({ min: 1, max: 100 }) },
        OrderStatuses: { name: 'OrderStatus.Status', type: LIST(ENUM(OrderStatus)) },
        PaymentMethods: { name: 'PaymentMethod.Method', type: LIST(ENUM(PaymentMethod)) },
        SellerOrderId: { type: STRING },
        TFMShipmentStatus: { type: ENUM(TFMShipmentStatus) }
    },
    validate() {
        // TODO
        return true;
    },
    data: 'Orders.Order',
    isArray: true
};
