import {
    ComplexType,
    BOOLEAN,
    ENUM,
    STRING
} from '../../../types';

import { CURRENCY_AMOUNT } from './index';
import { DeliveryExperience } from '../enums';

const required = true;

export default class ShipmentRequestDetailsType extends ComplexType {
    definition = {
        DeliveryExperience: { required, type: ENUM(DeliveryExperience) },
        DeclaredValue: { type: CURRENCY_AMOUNT },
        CarrierWillPickUp: { required, type: BOOLEAN },
        LabelFormat: { required, type: STRING }
    }
}
