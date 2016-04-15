'use strict';

const _ = require('lodash');
const Enum = require('../enum');
const Type = require('../types');

const list = true;
const required = true;

const requestDefaults = {
    name: 'Products',
    group: 'Products',
    path: '/Products/2011-10-01',
    version: '2011-10-01'
};

const enums = {
    ItemConditions() {
        return new Enum([ 'New', 'Used', 'Collectible', 'Refurbished', 'Club' ]);
    }
};

const types = {
    CompetitivePriceId: {
        '1': 'New Buy Box Price',
        '2': 'Used Buy Box Price'
    },
    ServiceStatus: {
        'GREEN':'The service is operating normally.',
        'GREEN_I':'The service is operating normally + additional info provided',
        'YELLOW':'The service is experiencing higher than normal error rates or degraded performance.',
        'RED':'The service is unabailable or experiencing extremely high error rates.'
    }
};

const requests = {
    /**
     * Requests the operational status of the Products API section.
     */
    GetServiceStatus: {},

    /**
     * Returns a list of products and their attributes, ordered by relevancy,
     * based on a search query that you specify
     */
    ListMatchingProducts: {
        params: {
            MarketplaceId: { required },
            Query: { required },
            QueryContextId: {}
        }
    },

    /**
     * Returns a list of products and their attributes,
     * based on a list of ASIN values that you specify
     */
    GetMatchingProduct: {
        params: {
            MarketplaceId: { required },
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns a list of products and their attributes,
     * based on a list of specified ID values that you specify
     */
    GetMatchingProductForId: {
        params: {
            MarketplaceId: { required },
            IdType: { required },
            IdList: { name: 'IdList.Id', list, required }
        }
    },

    /**
     * Returns the current competitive pricing of a product,
     * based on the SellerSKU and MarketplaceId that you specify
     */
    GetCompetitivePricingForSKU: {
        params: {
            MarketplaceId: { required },
            SellerSKUList: { name: 'SellerSKUList.SellerSKU', list, required }
        }
    },

    /**
     * Same as above, except that it uses a MarketplaceId and an ASIN to uniquely
     * identify a product, and it does not return the SKUIdentifier element
     */
    GetCompetitivePricingForASIN: {
        params: {
            MarketplaceId: { required },
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns the lowest price offer listings for a specific product by item condition.
     */
    GetLowestOfferListingsForSKU: {
        params: {
            MarketplaceId: { required },
            ItemCondition: {},
            SellerSKUList: { name: 'SellerSKUList.SellerSKU', list, required }
        }
    },

    /**
     * Same as above but by a list of ASIN's you provide
     */
    GetLowestOfferListingsForASIN: {
        params: {
            MarketplaceId: { required },
            ItemCondition: {},
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns the product categories that a product belongs to,
     * including parent categories back to the root for the marketplace
     */
    GetProductCategoriesForSKU: {
        params: {
            MarketplaceId: { required },
            SellerSKU: { required }
        }
    },

    /**
     * Same as above, except that it uses a MarketplaceId and an ASIN to
     * uniquely identify a product.
     */
    GetProductCategoriesForASIN: {
        params: {
            MarketplaceId: { required },
            ASIN: { required }
        }
    },

    /**
     * Returns pricing information for your own offer listings, based on ASIN.
     *
     */
    GetMyPriceForASIN: {
        params: {
            MarketplaceId: { required },
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns pricing information for your own offer listings,
     * based on SellerSKU.
     */
    GetMyPriceForSKU: {
        params: {
            MarketplaceId: { required },
            SellerSKUList: { name: 'SellerSKUList.SellerSKU', list, required }
        }
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests,
    types
};
