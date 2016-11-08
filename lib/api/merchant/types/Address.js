import {
    ComplexType,
    COUNTRY_CODE,
    STRING
} from '../../../types';

const required = true;

export default class AddressType extends ComplexType {
    definition = {
        Name: { required, type: STRING({ max: 30 }) },
        AddressLine1: { required, type: STRING({ max: 180 }) },
        AddressLine2: {  type: STRING({ max: 60 }) },
        AddressLine3: {  type: STRING({ max: 60 }) },
        DistrictOrCounty: { type: STRING({ max: 30 }) },
        Email: { required, type: EMAIL({ max: 256 }) },
        City: { required, type: STRING({ max: 30 }) },
        StateOrProvinceCode: { type: STRING({ max: 30 }) },
        PostalCode: { required, type: STRING({ max: 30 }) },
        CountryCode: { required, type: COUNTRY_CODE },
        Phone: { required, type: STRING({ max: 30 }) }
    }
}
