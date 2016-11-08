import { DATETIME, DATE } from '../../../types';

const list = true;
const required = true;

export const GetFulfillmentOrder = {
    params: {
        SellerFulfillmentOrderId: { required }
    }
};

export const GetFulfillmentPreview = {
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
        LineItems: { required }, // TODO: complex
        ShippingSpeeds: { name: 'ShippingSpeedCategories.member', list, type: 'fba.ShippingSpeedCategory' }
    }
};

export const ListAllFulfillmentOrders = {
    params: {
        QueryStartDateTime: { required, type: DATETIME },
        FulfillentMethods: { name: 'FulfillmentMethod.member', list }
    }
};

export const ListAllFulfillmentOrdersByNextToken = {
    parmas: {
        NextToken: { required }
    }
};

export const UpdateFulfillmentOrder = {
    params: {
        SellerFulfillmentOrderId: { required },
        ShippingSpeedCategory: { type: 'fba.ShippingSpeedCategory' },
        DisplayableOrderId: {},
        DisplayableOrderDateTime: { type: DATE },
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
        LineItems: { } // TODO: complex
    }
};
