import { DATETIME } from '../../../types';

const list = true;
const required = true;

export const CreateInboundShipment = {
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
        InboundShipmentItems: { required } // TODO: complex
    }
};

export const CreateInboundShipmentPlan = {
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
        InboundShipmentPlanRequestItems: { required } // TODO: complex
    }
};

export const GetServiceStatus = {};

export const ListInboundShipmentItems = {
    params: {
        ShipmentId: { required },
        LastUpdatedAfter: { type: DATETIME },
        LastUpdatedBefore: { type: DATETIME }
    }
};

export const ListInboundShipmentItemsByNextToken = {
    params: {
        NextToken: { required }
    }
};

export const ListInboundShipments = {
    params: {
        ShipmentStatuses: { name: 'ShipmentStatusList.member', list },
        ShipmentIds: { name: 'ShipmentIdList.member', list },
        LastUpdatedAfter: { type: DATETIME },
        LastUpdatedBefore: { type: DATETIME }
    }
};

export const ListInboundShipmentsByNextToken = {
    params: {
        NextToken: { required }
    }
};

export const UpdateInboundShipment = {
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
        InboundShipmentItems: { required } // TODO: complex
    }
};
