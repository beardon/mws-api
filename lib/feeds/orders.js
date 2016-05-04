'use strict';

const _ = require('lodash');
const createEnvelope = require('../xml').createEnvelope;
const errorNotImplemented = require('./index').errorNotImplemented;

const arr = (collection) => _.compact(_.isArray(collection) ? collection : [collection]);

const _POST_ORDER_ACKNOWLEDGEMENT_DATA_ = createEnvelope(function (data) {
    return {
        MerchantIdentifier: data.MerchantIdentifier,
        MessageType: 'OrderAcknowledgement',
        PurgeAndReplace: data.PurgeAndReplace,
        Message: {
            MessageID: data.MessageID,
            OrderAcknowledgement: {
                AmazonOrderID: data.AmazonOrderID,
                MerchantOrderID: data.MerchantOrderID,
                StatusCode: data.StatusCode,
                Item: _.map(arr(data.Item), (item) => ({
                    AmazonOrderItemCode: item.AmazonOrderItemCode,
                    MerchantOrderItemID: item.MerchantOrderItemID,
                    CancelReason: item.CancelReason
                }))
            }
        }
    };
});

const _POST_PAYMENT_ADJUSTMENT_DATA_ = errorNotImplemented('_POST_PAYMENT_ADJUSTMENT_DATA_');

const _POST_ORDER_FULFILLMENT_DATA_ = createEnvelope(function (data) {
    return {
        MerchantIdentifier: data.MerchantIdentifier,
        MessageType: 'OrderFulfillment',
        PurgeAndReplace: data.PurgeAndReplace,
        Message: {
            MessageID: data.MessageID,
            OrderFulfillment: {
                AmazonOrderID: data.AmazonOrderID,
                MerchantOrderID: data.MerchantOrderID,
                MerchantFulfillmentID: data.MerchantFulfillmentID,
                FulfillmentDate: data.FulfillmentDate,
                FulfillmentData: {
                    CarrierCode: data.CarrierCode,
                    CarrierName: data.CarrierName,
                    ShippingMethod: data.ShippingMethod,
                    ShipperTrackingNumber: data.ShipperTrackingNumber
                },
                Item: {
                    MerchantFulfillmentItemID: data.MerchantFulfillmentItemID,
                    Quantity: data.Quantity
                }
            }
        }
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
