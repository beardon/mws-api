'use strict';

const _ = require('lodash');
const AmazonMwsRequest = require('./request');
const Feeds = require('./sections/feeds');
const FulfillmentInboundShipment = require('./sections/fulfillment').Inbound;
const FulfillmentInventory = require('./sections/fulfillment').Inventory;
const FulfillmentOutboundShipment = require('./sections/fulfillment').Outbound;
const Orders = require('./sections/orders');
const Products = require('./sections/products');
const Promise = require('bluebird');
const Reports = require('./sections/reports');
const Sellers = require('./sections/sellers');

function errorNotImplemented(section) {
    return function () {
        return Promise.reject(new Error(`The ${section} API section is not implemented`));
    };
};

const defaults = {
    isArray: false,
    legacy: false,
    upload: false
};

function createRequests(section) {
    const requests = section.requests;
    const requestDefaults = section.requestDefaults;

    return _.mapValues(requests, (definition, action) => {
        return (args, meta) => {
            const opts = _.defaults(definition, { action }, requestDefaults, defaults);

            const req = new AmazonMwsRequest(opts);

            req.set(args);

            return this.invoke(req, meta);
        };
    });
}

module.exports = function (context) {
    const createRequestsBound = _.bind(createRequests, context);

    return {
        CartInformation: errorNotImplemented('CartInformation'),
        CustomerInformation: errorNotImplemented('CustomerInformation'),
        Feeds: createRequestsBound(Feeds),
        Finances: errorNotImplemented('Finances'),
        FulfillmentInboundShipment: createRequestsBound(FulfillmentInboundShipment),
        FulfillmentInventory: createRequestsBound(FulfillmentInventory),
        FulfillmentOutboundShipment: createRequestsBound(FulfillmentOutboundShipment),
        MerchantFulfillment: errorNotImplemented('MerchantFulfillment'),
        Orders: createRequestsBound(Orders),
        Products: createRequestsBound(Products),
        Recommendations: errorNotImplemented('Recommendations'),
        Reports: createRequestsBound(Reports),
        Sellers: createRequestsBound(Sellers),
        Subscriptions: errorNotImplemented('Subscriptions'),
        Webstore: errorNotImplemented('Webstore'),
    };
};
