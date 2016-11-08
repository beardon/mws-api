import {
    ComplexType,
    AMAZON_ORDER_ID,
    STRING,
    LIST,
    DATETIME
} from '../../../types';

import {
    ADDRESS,
    ITEM,
    LABEL_CUSTOMIZATION,
    PACKAGE_DIMENSIONS,
    SHIPPING_SERVICE_OPTIONS,
    WEIGHT
} from './index';

const required = true;

export default class ShipmentRequestDetailsType extends ComplexType {
    definition = {
        AmazonOrderId: { required, type: AMAZON_ORDER_ID },
        SellerOrderId: { type: STRING({ max: 64 }) },
        Items: { required, type:  LIST(ITEM) },
        ShipFromAddress: { required, type: ADDRESS },
        PackageDimensions: { required, type: PACKAGE_DIMENSIONS },
        Weight: { required, type: WEIGHT },
        MustArriveByDate: { type: DATETIME },
        ShipDate: { type: DATETIME },
        ShippingServiceOptions: { required, type: SHIPPING_SERVICE_OPTIONS },
        LabelCustomization: { type: LABEL_CUSTOMIZATION }
    }
}
