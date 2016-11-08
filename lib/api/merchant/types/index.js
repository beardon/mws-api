import { createTypeFactory } from '../../types';

import AddressType from './Address';
import CurrencyAmountType from './CurrencyAmount';
import ItemType from './Item';
import LabelCustomizationType from './LabelCustomization';
import PackageDimensionsType from './PackageDimensions';
import ShipmentRequestDetailsType from './ShipmentRequestDetails';
import ShippingServiceOptionsType from './ShippingServiceOptions';

export const ADDRESS = createTypeFactory(AddressType);
export const CURRENCY_AMOUNT = createTypeFactory(CurrencyAmountType);
export const ITEM = createTypeFactory(ItemType);
export const LABEL_CUSTOMIZATION = createTypeFactory(LabelCustomizationType);
export const PACKAGE_DIMENSIONS = createTypeFactory(PackageDimensionsType);
export const SHIPMENT_REQUEST_DETAILS = createTypeFactory(ShipmentRequestDetailsType);
export const SHIPPING_SERVICE_OPTIONS = createTypeFactory(ShippingServiceOptionsType);

export {
    AddressType,
    CurrencyAmountType,
    ItemType,
    LabelCustomizationType,
    PackageDimensionsType,
    ShipmentRequestDetailsType,
    ShippingServiceOptionsType
};
