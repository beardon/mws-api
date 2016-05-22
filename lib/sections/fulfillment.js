'use strict';

const _ = require('lodash');
const ComplexList = require('../complexList');
const Enum = require('../enum');
const Type = require('../types');

const list = true;
const required = true;

const fulfillmentRequestDefaults = {
    name: 'Fulfillment',
    version: '2010-10-01'
};

const inboundRequestDefaults = _.defaults({
    group: 'Inbound Shipments',
    path: '/FulfillmentInboundShipment/2010-10-01',
    nextName: 'FulfillmentInboundShipment'
}, fulfillmentRequestDefaults);

const inventoryRequestDefaults = _.defaults({
    group: 'Inventory',
    path: '/FulfillmentInventory/2010-10-01',
    nextName: 'FulfillmentInventory'
}, fulfillmentRequestDefaults);

const outboundRequestDefaults = _.defaults({
    group: 'Outbound Shipments',
    path: '/FulfillmentOutboundShipment/2010-10-01',
    nextName: 'FulfillmentOutboundShipment'
}, fulfillmentRequestDefaults);

/**
 * Initialize and create an add function for ComplexList parameters. You can create your
 * own custom complex parameters by making an object with an appendTo function that takes
 * an object as input and directly sets all of the associated values manually.
 */
const complex = {
    /**
     * Complex List used for CreateInboundShipment & UpdateInboundShipment requests
     *
     *     QuantityShipped
     *     SellerSKU
     */
    InboundShipmentItems(members) {
        return new ComplexList('InboundShipmentItems.member', members);
    },

    /**
     * Complex List used for CreateInboundShipmentPlan request
     *
     *    SellerSKU
     *    ASIN
     *    Quantity
     *    Condition
     */
    InboundShipmentPlanRequestItems(members) {
        return new ComplexList('InboundShipmentPlanRequestItems.member', members);
    },

    /**
     * The mac-daddy of ComplexListTypes... Used for CreateFulfillmentOrder request
     *
     *     DisplayableComment
     *     GiftMessage
     *     PerUnitDeclaredValue.Value
     *     PerUnitDeclaredValue.CurrencyCode
     *     Quantity
     *     SellerFulfillmentOrderItemId
     *     SellerSKU
     */
    CreateLineItems(members) {
        return new ComplexList('Items.member', members);
    },

    /**
     * The step child of above, used for GetFulfillmentPreview
     *
     *     Quantity
     *     SellerFulfillmentOrderItemId
     *     SellerSKU
     *     EstimatedShippingWeight
     *     ShippingWeightCalculationMethod
     */
    PreviewLineItems(members) {
        return new ComplexList('Items.member', members);
    }
};

const enums = {
    ResponseGroups() {
        return new Enum(['Basic', 'Detailed']);
    },
    ShippingSpeedCategories() {
        return new Enum(['Standard', 'Expedited', 'Priority']);
    },
    FulfillmentPolicies() {
        return new Enum(['FillOrKill', 'FillAll', 'FillAllAvailable']);
    }
};

const requests = {
    // Inbound Shipments
    Inbound: {
        GetServiceStatus: {},

        CreateInboundShipment: {
            params: {
                ShipmentId: { required },
                Shipmentname: { name: 'InboundShipmentHeader.ShipmentName', required },
                ShipFromName: { name: 'InboundShipmentHeader.ShipFromAddress.Name', required },
                ShipFromAddressLine1: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine1', required },
                ShipFromAddressLine2: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine2' },
                ShipFromAddressCity: { name: 'InboundShipmentHeader.ShipFromAddress.City', required },
                ShipFromDistrictOrCounty: { name: 'InboundShipmentHeader.ShipFromAddress.DistrictOrCounty' },
                ShipFromStateOrProvince: { name: 'InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode', required },
                ShipFromPostalCode: { name: 'InboundShipmentHeader.ShipFromAddress.PostalCode', required },
                ShipFromCountryCode: { name: 'InboundShipmentHeader.ShipFromAddress.CountryCode', required },
                DestinationFulfillmentCenterId: { name: 'InboundShipmentHeader.DestinationFulfillmentCenterId', required },
                ShipmentStatus: { name: 'InboundShipmentHeader.ShipmentStatus' },
                LabelPrepPreference: { name: 'InboundShipmentHeader.LabelPrepPreference' },
                InboundShipmentItems: { type: Type.COMPLEX, required, construct: complex.InboundShipmentItems }
            }
        },

        CreateInboundShipmentPlan: {
            parms: {
                LabelPrepPreference: { required },
                ShipFromName: { name: 'ShipFromAddress.Name' },
                ShipFromAddressLine1: { name: 'ShipFromAddress.AddressLine1' },
                ShipFromCity: { name: 'ShipFromAddress.City' },
                ShipFromStateOrProvince: { name: 'ShipFromAddress.StateOrProvinceCode' },
                ShipFromPostalCode: { name: 'ShipFromAddress.PostalCode' },
                ShipFromCountryCode: { name: 'ShipFromAddress.CountryCode' },
                ShipFromAddressLine2: { name: 'ShipFromAddress.AddressLine2' },
                ShipFromDistrictOrCounty: { name: 'ShipFromAddress.DistrictOrCounty' },
                InboundShipmentPlanRequestItems: { type: Type.COMPLEX, required, construct: complex.InboundShipmentPlanRequestItems }
            }
        },

        ListInboundShipmentItems: {
            params: {
                ShipmentId: { required },
                LastUpdatedAfter: { type: Type.TIMESTAMP },
                LastUpdatedBefore: { type: Type.TIMESTAMP }
            }
        },

        ListInboundShipmentItemsByNextToken: {
            params: {
                NextToken: { required }
            }
        },

        ListInboundShipments: {
            params: {
                ShipmentStatuses: { name: 'ShipmentStatusList.member', list },
                ShipmentIds: { name: 'ShipmentIdList.member', list },
                LastUpdatedAfter: { type: Type.TIMESTAMP },
                LastUpdatedBefore: { type: Type.TIMESTAMP }
            }
        },

        ListInboundShipmentsByNextToken: {
            params: {
                NextToken: { required }
            }
        },

        UpdateInboundShipment: {
            params: {
                ShipmentId: { required },
                ShipmentName: { name: 'InboundShipmentHeader.ShipmentName', required },
                ShipFromName: { name: 'InboundShipmentHeader.ShipFromAddress.Name', required },
                ShipFromAddressLine1: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine1', required },
                ShipFromAddressLine2: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine2' },
                ShipFromAddressCity: { name: 'InboundShipmentHeader.ShipFromAddress.City', required },
                ShipFromDistrictOrCounty: { name: 'InboundShipmentHeader.ShipFromAddress.DistrictOrCounty' },
                ShipFromStateOrProvince: { name: 'InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode', required },
                ShipFromPostalCode: { name: 'InboundShipmentHeader.ShipFromAddress.PostalCode', required },
                ShipFromCountryCode: { name: 'InboundShipmentHeader.ShipFromAddress.CountryCode', required },
                DestinationFulfillmentCenterId: { name: 'InboundShipmentHeader.DestinationFulfillmentCenterId', required },
                ShipmentStatus: { name: 'InboundShipmentHeader.ShipmentStatus' },
                LabelPrepPreference: { name: 'InboundShipmentHeader.LabelPrepPreference' },
                InboundShipmentItems: { type: Type.COMPLEX, required, construct: complex.InboundShipmentItems }
            }
        }
    },

    // Inventory
    Inventory: {
        GetServiceStatus: {},

        ListInventorySupply: {
            params: {
                SellerSkus: { name: 'SellerSkus.member', list },
                QueryStartDateTime: { type: Type.TIMESTAMP },
                ResponseGroup: {}
            }
        },

        ListInventorySupplyByNextToken: {
            params: {
                NextToken: { required }
            }
        }
    },

    // Outbound Shipments
    Outbound: {
        GetServiceStatus: {},

        CancelFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required }
            }
        },

        CreateFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required },
                ShippingSpeedCategory: { required, type: 'fba.ShippingSpeedCategory' },
                DisplayableOrderId: { required },
                DisplayableOrderDateTime: { type: Type.TIMESTAMP },
                DisplayableOrderComment: {},
                FulfillmentPolicy: { type: 'fba.FulfillmentPolicy' },
                FulfillmentMethod: {},
                NotificationEmails: { name: 'NotificationEmailList.member', list },
                DestName: { name: 'DestinationAddress.Name' },
                DestAddressLine1: { name: 'DestinationAddress.Line1' },
                DestAddressLine2: { name: 'DestinationAddress.Line2' },
                DestAddressLine3: { name: 'DestinationAddress.Line3' },
                DestCity: { name: 'DestinationAddress.City' },
                DestStateOrProvince: { name: 'DestinationAddress.StateOrProvinceCode' },
                DestPostalCode: { name: 'DestinationAddress.PostalCode' },
                DestCountryCode: { name: 'DestinationAddress.CountryCode' },
                DestDistrictOrCounty: { name: 'DestinationAddress.DistrictOrCounty' },
                DestPhoneNumber: { name: 'DestinationAddress.PhoneNumber' },
                LineItems: { type: Type.COMPLEX, required, construct: complex.CreateLineItems }
            }
        },

        GetFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required }
            }
        },

        GetFulfillmentPreview: {
            params: {
                ToName: { name: 'Address.Name' },
                ToAddressLine1: { name: 'Address.Line1' },
                ToAddressLine2: { name: 'Address.Line2' },
                ToAddressLine3: { name: 'Address.Line3' },
                ToCity: { name: 'Address.City' },
                ToStateOrProvince: { name: 'Address.StateOrProvinceCode' },
                ToPostalCode: { name: 'Address.PostalCode' },
                ToCountry: { name: 'Address.CountryCode' },
                ToDistrictOrCounty: { name: 'Address.DistrictOrCounty' },
                ToPhoneNumber: { name: 'Address.PhoneNumber' },
                LineItems: { type: Type.COMPLEX, required, construct: complex.PreviewLineItems },
                ShippingSpeeds: { name: 'ShippingSpeedCategories.member', list, type: 'fba.ShippingSpeedCategory' }
             }
        },

        ListAllFulfillmentOrders: {
            params: {
                QueryStartDateTime: { required, type: Type.TIMESTAMP },
                FulfillentMethods: { name: 'FulfillmentMethod.member', list }
            }
        },

        ListAllFulfillmentOrdersByNextToken: {
            parmas: {
                NextToken: { required }
            }
        },

        UpdateFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required },
                ShippingSpeedCategory: { type: 'fba.ShippingSpeedCategory' },
                DisplayableOrderId: {},
                DisplayableOrderDateTime: { type: Type.DATE },
                DisplayableOrderComment: {},
                FulfillmentPolicy: { type: 'fba.FulfillmentPolicy' },
                FulfillmentAction: {},
                NotificationEmails: { name: 'NotificationEmailList.member', list },
                DestName: { name: 'DestinationAddress.Name' },
                DestAddressLine1: { name: 'DestinationAddress.Line1' },
                DestAddressLine2: { name: 'DestinationAddress.Line2' },
                DestAddressLine3: { name: 'DestinationAddress.Line3' },
                DestCity: { name: 'DestinationAddress.City' },
                DestStateOrProvince: { name: 'DestinationAddress.StateOrProvinceCode' },
                DestPostalCode: { name: 'DestinationAddress.PostalCode' },
                DestCountryCode: { name: 'DestinationAddress.CountryCode' },
                DestDistrictOrCounty: { name: 'DestinationAddress.DistrictOrCounty' },
                DestPhoneNumber: { name: 'DestinationAddress.PhoneNumber' },
                LineItems: { type: Type.COMPLEX, construct: complex.CreateLineItems }
            }
        }
    }
};

module.exports = {
    complex,
    enums,
    Inbound: {
        requests: requests.Inbound,
        requestDefaults: inboundRequestDefaults
    },
    Inventory: {
        requests: requests.Inventory,
        requestDefaults: inventoryRequestDefaults
    },
    Outbound: {
        requests: requests.Outbound,
        requestDefaults: outboundRequestDefaults
    },
    requests
};
