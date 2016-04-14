'use strict';

const _ = require('lodash');
const Enum = require('../enum');

const requestDefaults = {
    name: 'Orders',
    group: 'Order Retrieval',
    path: '/Orders/2013-09-01',
    version: '2013-09-01',
};

/**
 * Ojects to represent enum collections used by some request(s)
 */
const enums = {
    FulfillmentChannels() {
        return new Enum(['AFN', 'MFN']);
    },
    OrderStatuses() {
        return new Enum(['Pending', 'Unshipped', 'PartiallyShipped', 'Shipped', 'Canceled', 'Unfulfillable']);
    },
    PaymentMethods() {
        return new Enum(['COD', 'CVS', 'Other']);
    }
};

/**
 * Contains brief definitions for unique data type values.
 * Can be used to explain input/output to users via tooltips, for example
 */
const types = {
    FulfillmentChannel: {
        AFN: 'Amazon Fulfillment Network',
        MFN: 'Merchant\'s Fulfillment Network'
    },
    OrderStatus: {
        Pending: 'Order placed but payment not yet authorized. Not ready for shipment.',
        Unshipped: 'Payment has been authorized. Order ready for shipment, but no items shipped yet. Implies PartiallyShipped.',
        PartiallyShipped: 'One or more (but not all) items have been shipped. Implies Unshipped.',
        Shipped: 'All items in the order have been shipped.',
        Canceled: 'The order was canceled.',
        Unfulfillable: 'The order cannot be fulfilled. Applies only to Amazon-fulfilled orders not placed on Amazon.'
    },
    PaymentMethod: {
        COD: 'Cash on delivery',
        CVS: 'Convenience store payment',
        Other: 'Any payment method other than COD or CVS'
    },
    ServiceStatus: {
        GREEN: 'The service is operating normally.',
        GREEN_I: 'The service is operating normally + additional info provided',
        YELLOW: 'The service is experiencing higher than normal error rates or degraded performance.',
        RED: 'The service is unabailable or experiencing extremely high error rates.'
    },
    ShipServiceLevelCategory: {
        Expedited: 'Expedited shipping',
        NextDay: 'Overnight shipping',
        SecondDay: 'Second-day shipping',
        Standard: 'Standard shipping'
    }
};

/**
 * A collection of currently supported request definitions
 */
const requests = {
    /**
     * Requests the operational status of the Orders API section.
     */
    GetServiceStatus: {
        getPath: 'GetServiceStatusResponse.GetServiceStatusResult'
    },

    /**
     * Returns orders created or updated during a time frame you specify.
     */
    ListOrders: {
        params: {
            CreatedAfter: { type: 'Timestamp' },
            CreatedBefore: { type: 'Timestamp' },
            LastUpdatedAfter: { type: 'Timestamp' },
            MarketplaceId: { name: 'MarketplaceId.Id', list: true, required: true },
            LastUpdatedBefore: { type: 'Timestamp' },
            OrderStatus: { name: 'OrderStatus.Status', type: 'orders.OrderStatuses', list: true },
            FulfillmentChannel: { name: 'FulfillmentChannel.Channel', type: 'orders.FulfillmentChannels', list: true },
            PaymentMethod: { name: 'PaymentMethod.Method', type: 'orders.PaymentMethods', list: true },
            BuyerEmail: {},
            SellerOrderId: {},
            MaxResultsPerPage: {}
        },
        getPath: 'ListOrdersResponse.ListOrdersResult.Orders.Order',
        next: 'Orders.ListOrdersByNextToken',
        nextTokenPath: 'ListOrdersResponse.ListOrdersResult.NextToken',
        isArray: true
    },

    /**
     * Returns the next page of orders using the NextToken parameter.
     */
    ListOrdersByNextToken: {
        params: {
            NextToken: { required: true }
        },
        getPath: 'ListOrdersByNextTokenResponse.ListOrdersByNextTokenResult.Orders.Order',
        next: 'Orders.ListOrdersByNextToken',
        nextTokenPath: 'ListOrdersByNextTokenResponse.ListOrdersByNextTokenResult.NextToken',
        isArray: true
    },

    /**
     * Returns orders based on the AmazonOrderId values that you specify.
     */
    GetOrder: {
        params: {
            AmazonOrderId: { name: 'AmazonOrderId.Id', required: true, list: true }
        },
        getPath: 'GetOrderResponse.GetOrderResult.Orders.Order',
        isArray: true
    },

    /**
     * Returns order items based on the AmazonOrderId that you specify.
     */
    ListOrderItems: {
        params: {
            AmazonOrderId: { required: true }
        },
        getPath: 'ListOrderItemsResponse.ListOrderItemsResult.OrderItems.OrderItem',
        next: 'Orders.ListOrderItemsByNextToken',
        nextTokenPath: 'ListOrderItemsResponse.ListOrderItemsResult.NextToken',
        isArray: true
    },

    /**
     * Returns the next page of order items using the NextToken parameter.
     */
    ListOrderItemsByNextToken: {
        params: {
            NextToken: { required: true }
        },
        getPath: 'ListOrderItemsByNextTokenResponse.ListOrderItemsByNextTokenResult.OrderItems.OrderItem',
        next: 'Orders.ListOrderItemsByNextToken',
        nextTokenPath: 'ListOrderItemsByNextTokenResponse.ListOrderItemsByNextTokenResult.NextToken',
        isArray: true
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests,
    types
};
