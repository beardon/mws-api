'use strict';

const _ = require('lodash');
const ComplexList = require('../complexList');
const Enum = require('../enum');

const fulfillmentRequestDefaults = {
    name: 'Fulfillment',
    version: '2010-10-01'
};

const inboundRequestDefaults = _.defaults({
    group: 'Inbound Shipments',
    path: '/FulfillmentInboundShipment/2010-10-01'
}, fulfillmentRequestDefaults);

const inventoryRequestDefaults = _.defaults({
    group: 'Inventory',
    path: '/FulfillmentInventory/2010-10-01'
}, fulfillmentRequestDefaults);

const outboundRequestDefaults = _.defaults({
    group: 'Outbound Shipments',
    path: '/FulfillmentOutboundShipment/2010-10-01'
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
                ShipmentId: { required: true},
                Shipmentname: { name: 'InboundShipmentHeader.ShipmentName', required: true },
                ShipFromName: { name: 'InboundShipmentHeader.ShipFromAddress.Name', required: true },
                ShipFromAddressLine1: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine1', required: true },
                ShipFromAddressLine2: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine2', required: false },
                ShipFromAddressCity: { name: 'InboundShipmentHeader.ShipFromAddress.City', required: true },
                ShipFromDistrictOrCounty: { name: 'InboundShipmentHeader.ShipFromAddress.DistrictOrCounty', required: false },
                ShipFromStateOrProvince: { name: 'InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode', required: true },
                ShipFromPostalCode: { name: 'InboundShipmentHeader.ShipFromAddress.PostalCode', required: true },
                ShipFromCountryCode: { name: 'InboundShipmentHeader.ShipFromAddress.CountryCode', required: true },
                DestinationFulfillmentCenterId: { name: 'InboundShipmentHeader.DestinationFulfillmentCenterId', required: true },
                ShipmentStatus: { name: 'InboundShipmentHeader.ShipmentStatus' },
                LabelPrepPreference: { name: 'InboundShipmentHeader.LabelPrepPreference' },
                InboundShipmentItems: { type: 'Complex', required: true, construct: complex.InboundShipmentItems }
            }
        },

        CreateInboundShipmentPlan: {
            parms: {
                LabelPrepPreference: { required: true },
                ShipFromName: { name: 'ShipFromAddress.Name' },
                ShipFromAddressLine1: { name: 'ShipFromAddress.AddressLine1' },
                ShipFromCity: { name: 'ShipFromAddress.City' },
                ShipFromStateOrProvince: { name: 'ShipFromAddress.StateOrProvinceCode' },
                ShipFromPostalCode: { name: 'ShipFromAddress.PostalCode' },
                ShipFromCountryCode: { name: 'ShipFromAddress.CountryCode' },
                ShipFromAddressLine2: { name: 'ShipFromAddress.AddressLine2' },
                ShipFromDistrictOrCounty: { name: 'ShipFromAddress.DistrictOrCounty' },
                InboundShipmentPlanRequestItems: { type: 'Complex', required: true, construct: complex.InboundShipmentPlanRequestItems }
            }
        },

        ListInboundShipmentItems: {
            params: {
                ShipmentId: { required: true },
                LastUpdatedAfter: { type: 'Timestamp' },
                LastUpdatedBefore: { type: 'Timestamp' }
            }
        },

        ListInboundShipmentItemsByNextToken: {
            params: {
                NextToken: { required: true }
            }
        },

        ListInboundShipments: {
            params: {
                ShipmentStatuses: { name: 'ShipmentStatusList.member', list: true, required: false },
                ShipmentIds: { name: 'ShipmentIdList.member', list: true, required: false },
                LastUpdatedAfter: { type: 'Timestamp' },
                LastUpdatedBefore: { type: 'Timestamp' }
            }
        },

        ListInboundShipmentsByNextToken: {
            params: {
                NextToken: { required: true }
            }
        },

        UpdateInboundShipment: {
            params: {
                ShipmentId: { required: true },
                ShipmentName: { name: 'InboundShipmentHeader.ShipmentName', required: true },
                ShipFromName: { name: 'InboundShipmentHeader.ShipFromAddress.Name', required: true },
                ShipFromAddressLine1: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine1', required: true },
                ShipFromAddressLine2: { name: 'InboundShipmentHeader.ShipFromAddress.AddressLine2', required: false },
                ShipFromAddressCity: { name: 'InboundShipmentHeader.ShipFromAddress.City', required: true },
                ShipFromDistrictOrCounty: { name: 'InboundShipmentHeader.ShipFromAddress.DistrictOrCounty', required: false },
                ShipFromStateOrProvince: { name: 'InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode', required: true },
                ShipFromPostalCode: { name: 'InboundShipmentHeader.ShipFromAddress.PostalCode', required: true },
                ShipFromCountryCode: { name: 'InboundShipmentHeader.ShipFromAddress.CountryCode', required: true },
                DestinationFulfillmentCenterId: { name: 'InboundShipmentHeader.DestinationFulfillmentCenterId', required: true },
                ShipmentStatus: { name: 'InboundShipmentHeader.ShipmentStatus' },
                LabelPrepPreference: { name: 'InboundShipmentHeader.LabelPrepPreference' },
                InboundShipmentItems: { type: 'Complex', required: true, construct: complex.InboundShipmentItems }
            }
        }
    },

    // Inventory
    Inventory: {
        GetServiceStatus: {},

        ListInventorySupply: {
            params: {
                SellerSkus: { name: 'SellerSkus.member', list: true },
                QueryStartDateTime: { type: 'Timestamp' },
                ResponseGroup: {}
            }
        },

        ListInventorySupplyByNextToken: {
            params: {
                NextToken: { required: true }
            }
        }
    },

    // Outbound Shipments
    Outbound: {
        GetServiceStatus: {},

        CancelFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required: true }
            }
        },

        CreateFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required: true },
                ShippingSpeedCategory: { required: true, type: 'fba.ShippingSpeedCategory' },
                DisplayableOrderId: { required: true },
                DisplayableOrderDateTime: { type: 'Timestamp' },
                DisplayableOrderComment: {},
                FulfillmentPolicy: { required: false, type: 'fba.FulfillmentPolicy' },
                FulfillmentMethod: { required: false },
                NotificationEmails: { name: 'NotificationEmailList.member', required: false, list: true },
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
                LineItems: { type: 'Complex', required: true, construct: complex.CreateLineItems }
            }
        },

        GetFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required: true }
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
                LineItems: { type: 'Complex', required: true, construct: complex.PreviewLineItems },
                ShippingSpeeds: { name: 'ShippingSpeedCategories.member', list: true, type: 'fba.ShippingSpeedCategory' }
             }
        },

        ListAllFulfillmentOrders: {
            params: {
                QueryStartDateTime: { required: true, type: 'Timestamp' },
                FulfillentMethods: { name: 'FulfillmentMethod.member', list: true }
            }
        },

        ListAllFulfillmentOrdersByNextToken: {
            parmas: {
                NextToken: { required: true }
            }
        },

        UpdateFulfillmentOrder: {
            params: {
                SellerFulfillmentOrderId: { required: true },
                ShippingSpeedCategory: { required: false, type: 'fba.ShippingSpeedCategory' },
                DisplayableOrderId: { required: false },
                DisplayableOrderDateTime: { type: 'Date' },
                DisplayableOrderComment: {},
                FulfillmentPolicy: { required: false, type: 'fba.FulfillmentPolicy' },
                FulfillmentAction: { required: false },
                NotificationEmails: { name: 'NotificationEmailList.member', required: false, list: true },
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
                LineItems: { type: 'Complex', required: false, construct: complex.CreateLineItems }
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
