import {
    STRING,
    UUID
} from '../../../types';

import {
    SHIPMENT_REQUEST_DETAILS
} from '../types';


const required = true;

export default {
    params: {
        ShipmentRequestDetails: { required, type: SHIPMENT_REQUEST_DETAILS }
    },
    data: 'ShippingServiceList'
};
