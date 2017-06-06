'use strict';

const _ = require('lodash');
const createEnvelope = require('../xml').createEnvelope;
const errorNotImplemented = require('./index').errorNotImplemented;

const arr = (collection) => _.compact(_.isArray(collection) ? collection : [collection]);

const _POST_ORDER_ACKNOWLEDGEMENT_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'OrderAcknowledgement',
        Message: arr(data).map((m) => ({
            MessageID: m.MessageID,
            OrderAcknowledgement: {
                AmazonOrderID: m.AmazonOrderID,
                MerchantOrderID: m.MerchantOrderID,
                StatusCode: m.StatusCode,
                Item: _.map(arr(m.Item), (item) => ({
                    AmazonOrderItemCode: item.AmazonOrderItemCode,
                    MerchantOrderItemID: item.MerchantOrderItemID,
                    CancelReason: item.CancelReason
                }))
            }
        }))

    };
});

const _POST_PAYMENT_ADJUSTMENT_DATA_ = errorNotImplemented('_POST_PAYMENT_ADJUSTMENT_DATA_');

const _POST_ORDER_FULFILLMENT_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'OrderFulfillment',
        Message: arr(data).map((m) => ({
            MessageID: m.MessageID,
            OrderFulfillment: {
                AmazonOrderID: m.AmazonOrderID,
                MerchantOrderID: m.MerchantOrderID,
                MerchantFulfillmentID: m.MerchantFulfillmentID,
                FulfillmentDate: m.FulfillmentDate,
                FulfillmentData: {
                    CarrierCode: m.CarrierCode,
                    CarrierName: m.CarrierName,
                    ShippingMethod: m.ShippingMethod,
                    ShipperTrackingNumber: m.ShipperTrackingNumber
                },
                Item: _.map(arr(m.Item), (item) => ({
                    AmazonOrderItemCode: item.AmazonOrderItemCode,
                    MerchantOrderItemID: item.MerchantOrderItemID,
                    MerchantFulfillmentItemID: item.MerchantFulfillmentItemID,
                    Quantity: item.Quantity
                }))
            }
        }))
    };
});

const _POST_INVOICE_CONFIRMATION_DATA_ = errorNotImplemented('_POST_INVOICE_CONFIRMATION_DATA_');
const _POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_ = errorNotImplemented('_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_');
const _POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_ = errorNotImplemented('_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_');
const _POST_FLAT_FILE_FULFILLMENT_DATA_ = errorNotImplemented('_POST_FLAT_FILE_FULFILLMENT_DATA_');
const _POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_ = errorNotImplemented('_POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_');

module.exports = {
    _POST_ORDER_ACKNOWLEDGEMENT_DATA_,
    _POST_PAYMENT_ADJUSTMENT_DATA_,
    _POST_ORDER_FULFILLMENT_DATA_,
    _POST_INVOICE_CONFIRMATION_DATA_,
    _POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_,
    _POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_,
    _POST_FLAT_FILE_FULFILLMENT_DATA_,
    _POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_
};
