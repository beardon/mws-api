import {
    ASIN,
    BOOLEAN,
    ENUM,
    FEED_ESTIMATE_REQUEST,
    LIST,
    MARKETPLACE_ID,
    PARAM,
    STRING
} from '../../types';

import { IdType, ItemCondition } from './enums';

const required = true;
const isArray = true;

export const GetCompetitivePricingForASIN = {
    params: {
        ASINs: { name: 'ASINList.ASIN', required, type: PARAM(LIST(ASIN), { max: 20 }) },
        MarketplaceId: { required, type: MARKETPLACE_ID }
    },
    isArray
};

export const GetCompetitivePricingForSKU = {
    params: {
        MarketplaceId: { required, type: MARKETPLACE_ID },
        SellerSKUs: { name: 'SellerSKUList.SellerSKU', required, type: PARAM(LIST(STRING), { max: 20 }) }
    },
    isArray
};

export const GetLowestOfferListingsForASIN = {
    params: {
        ASINs: { name: 'ASINList.ASIN', required, type: PARAM(LIST(ASIN), { max: 20 }) },
        ItemCondition: { type: ENUM(ItemCondition) },
        MarketplaceId: { required, type: MARKETPLACE_ID }
    },
    isArray
};

export const GetLowestOfferListingsForSKU = {
    params: {
        ExcludeMe: { type: BOOLEAN },
        ItemCondition: { type: ENUM(ItemCondition) },
        MarketplaceId: { required, type: MARKETPLACE_ID },
        SellerSKUs: { name: 'SellerSKUList.SellerSKU', required, type: PARAM(LIST(STRING), { max: 20 }) }
    },
    isArray
};

export const GetLowestPricedOffersForASIN = {
    params: {
        ItemCondition: { required, type: ENUM(ItemCondition) },
        MarketplaceId: { required, type: MARKETPLACE_ID },
        ASIN: { required, type: ASIN }
    },
    isArray
};

export const GetLowestPricedOffersForSKU = {
    params: {
        ItemCondition: { required, type: ENUM(ItemCondition) },
        MarketplaceId: { required, type: MARKETPLACE_ID },
        SellerSKU: { required, type: STRING }
    },
    isArray
};

export const GetMatchingProduct = {
    params: {
        ASINs: { name: 'ASINList.ASIN', required, type: PARAM(LIST(ASIN), { max: 10 }) },
        MarketplaceId: { required, type: MARKETPLACE_ID }
    }
};

export const GetMatchingProductForId = {
    params: {
        Ids: { name: 'IdList.Id', required, type: PARAM(LIST(STRING), { max: 5 }) },
        IdType: { required, type: ENUM(IdType) },
        MarketplaceId: { required, type: MARKETPLACE_ID }
    }
};

export const GetMyFeesEstimate = {
    params: {
        FeesEstimateRequests: { name: 'FeesEstimateRequestList.FeesEstimateRequest', required, type: PARAM(LIST(FEED_ESTIMATE_REQUEST), { max: 20 }) }
    }
};

export const GetMyPriceForASIN = {
    params: {
        ASINs: { name: 'ASINList.ASIN', required, type: LIST(ASIN) },
        ItemCondition: { type: ENUM(ItemCondition) },
        MarketplaceId: { required, type: MARKETPLACE_ID }
    },
    isArray
};

export const GetMyPriceForSKU = {
    params: {
        ItemCondition: { type: ENUM(ItemCondition) },
        MarketplaceId: { required, type: MARKETPLACE_ID },
        SellerSKUs: { name: 'SellerSKUList.SellerSKU', required, type: PARAM(LIST(STRING), { max: 20 }) }
    },
    isArray
};

export const GetProductCategoriesForASIN = {
    params: {
        ASIN: { required, type: ASIN },
        MarketplaceId: { required, type: MARKETPLACE_ID }
    },
    isArray
};

export const GetProductCategoriesForSKU = {
    params: {
        MarketplaceId: { required, type: MARKETPLACE_ID },
        SellerSKU: { required, type: STRING }
    },
    isArray
};

export const GetServiceStatus = {};

export const ListMatchingProducts = {
    params: {
        MarketplaceId: { required, type: MARKETPLACE_ID },
        Query: { required, type: STRING },
        QueryContextId: { required, type: STRING } // TODO?
    },
    isArray,
    validate() {
        // TODO?
        return true;
    }
};
