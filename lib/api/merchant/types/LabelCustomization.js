import {
    ComplexType,
    STRING
} from '../../../types';

import { StandardIdForLabel } from '../enums';

export default class LabelCustomizationType extends ComplexType {
    definition = {
        CustomTextForLabel: { type: STRING({ max: 14 }) },
        StandardIdForLabel: { type: ENUM(StandardIdForLabel) }
    }
}
