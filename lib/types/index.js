import AmazonOrderIdType from './AmazonOrderId';
import AnyType from './Any';
import ASINType from './ASIN';
import BodyType from './Body';
import BooleanType from './Boolean';
import ComplexType from './Complex';
import DateTimeType from './DateTime';
import DateType from './Date';
import DecimalType from './Decimal';
import EmailType from './Email';
import EnumType from './Enum';
import IntegerType from './Integer';
import ListType from './List';
import MarketplaceIdType from './MarketplaceId';
import StringType from './String';
import UUIDType from './UUID';

export function createTypeFactory(Type, ...args) {
    const F = (...instanceArgs) => ({
        create(value) {
            return new Type(value, ...args, ...instanceArgs);
        }
    });

    F.create = (value) => new Type(value, ...args);

    return F;
}

export const AMAZON_ORDER_ID = createTypeFactory(AmazonOrderIdType);
export const ANY = createTypeFactory(AnyType);
export const ASIN = createTypeFactory(ASINType);
export const BODY = createTypeFactory(BodyType);
export const BOOLEAN = createTypeFactory(BooleanType);
export const DATE = createTypeFactory(DateType);
export const DATETIME = createTypeFactory(DateTimeType);
export const DECIMAL = createTypeFactory(DecimalType);
export const ENUM = createTypeFactory(EnumType);
export const EMAIL = createTypeFactory(EmailType);
export const INTEGER = createTypeFactory(IntegerType);
export const LIST = createTypeFactory(ListType);
export const MARKETPLACE_ID = createTypeFactory(MarketplaceIdType);
export const STRING = createTypeFactory(StringType);
export const UUID = createTypeFactory(UUIDType);

export {
    AmazonOrderIdType,
    AnyType,
    ASINType,
    BodyType,
    BooleanType,
    ComplexType,
    DateTimeType,
    DateType,
    DecimalType,
    EnumType,
    EmailType,
    IntegerType,
    ListType,
    MarketplaceIdType,
    StringType,
    UUIDType
};
