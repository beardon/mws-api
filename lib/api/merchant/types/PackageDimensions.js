import {
    ComplexType,
    DECIMAL,
    STRING
} from '../../../types';

import { PredefinedPackageDimensions } from '../enums';

const required = true;

export default class PackageDimensionsType extends ComplexType {
    definition = {
        Length: { type: DECIMAL({ min: 0 }) }, // TODO: >=
        Width: { type: DECIMAL({ min: 0 }) },
        Height: { type: DECIMAL({ min: 0 }) },
        Unit: { type: STRING },
        PredefinedPackageDimensions: { type: ENUM(PredefinedPackageDimensions) }
    }

    validate() {
        super.validate();

        // TODO
    }
}
