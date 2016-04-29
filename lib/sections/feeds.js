'use strict';

const _ = require('lodash');
const Enum = require('../enum');
const Type = require('../types');

const list = true;
const required = true;
const isArray = true;
const upload = true;

const requestDefaults = {
    name: 'Feeds',
    group: 'Feeds',
    path: '/',
    version: '2009-01-01',
    legacy: true
};

const enums = {
    FeedProcessingStatuses() {
        return new Enum([
            '_AWAITING_ASYNCHRONOUS_REPLY_',
            '_CANCELLED_',
            '_DONE_',
            '_IN_PROGRESS_',
            '_IN_SAFETY_NET_',
            '_SUBMITTED_',
            '_UNCONFIRMED_'
        ]);
    },

    FeedTypes() {
        return new Enum([
            '_POST_PRODUCT_DATA_', '_POST_PRODUCT_RELATIONSHIP_DATA_', '_POST_ITEM_DATA_', '_POST_PRODUCT_OVERRIDES_DATA_', '_POST_PRODUCT_IMAGE_DATA_',
            '_POST_PRODUCT_PRICING_DATA_', '_POST_INVENTORY_AVAILABILITY_DATA_', '_POST_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_ORDER_FULFILLMENT_DATA_',
            '_POST_FULFILLMENT_ORDER_REQUEST_DATA_', '_POST_FULFILLMENT_ORDER_CANCELLATION', '_POST_PAYMENT_ADJUSTMENT_DATA_', '_POST_INVOICE_CONFIRMATION_DATA_',
            '_POST_FLAT_FILE_LISTINGS_DATA_', '_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_FLAT_FILE_FULFILLMENT_DATA_',
            '_POST_FLAT_FILE_FBA_CREATE_INBOUND_SHIPMENT_', '_POST_FLAT_FILE_FBA_UPDATE_INBOUND_SHIPMENT_', '_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_',
            '_POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_', '_POST_FLAT_FILE_INVLOADER_DATA_', '_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_',
            '_POST_FLAT_FILE_BOOKLOADER_DATA_', '_POST_FLAT_FILE_LISTINGS_DATA_', '_POST_FLAT_FILE_PRICEANDQUANTITYONLY', '_POST_UIEE_BOOKLOADER_DATA_'
        ]);
    }
};

const requests = {
    SubmitFeed: {
        params: {
          FeedContent: { type: Type.BODY, required },
          FeedType: { required },
          MarketplaceIds: { name: 'MarketplaceIdList.Id', list },
          PurgeAndReplace: { type: Type.BOOLEAN }
        },
        upload,
        data: 'FeedSubmissionInfo'
    },

    GetFeedSubmissionList: {
        params: {
            FeedSubmissionIds: { name: 'FeedSubmissionIdList.Id', list },
            MaxCount: {},
            FeedTypes: { name: 'FeedTypeList.Type', list },
            FeedProcessingStatuses: { name: 'FeedProcessingStatusList.Status', list, type: 'bde.FeedProcessingStatuses' },
            SubmittedFrom: { name: 'SubmittedFromDate', type: Type.TIMESTAMP },
            SubmittedTo: { name: 'SubmittedToDate', type: Type.TIMESTAMP }
        },
        data: 'FeedSubmissionInfo',
        isArray
    },

    GetFeedSubmissionListByNextToken: {
        params: {
            NextToken: { name: 'NextToken', required }
        },
        data: 'FeedSubmissionInfo',
        isArray
    },

    GetFeedSubmissionCount: {
        params: {
            FeedTypes: { name: 'FeedTypeList.Type', list },
            FeedProcessingStatuses: { name: 'FeedProcessingStatusList.Status', list, type: 'bde.FeedProcessingStatuses' },
            SubmittedFrom: { name: 'SubmittedFromDate', type: Type.TIMESTAMP },
            SubmittedTo: { name: 'SubmittedToDate', type: Type.TIMESTAMP }
        },
        data: 'Count'
    },

    CancelFeedSubmissions: {
        params: {
            FeedSubmissionIds: { name: 'FeedSubmissionIdList.Id', list, required },
            FeedTypes: { name: 'FeedTypeList.Type', list:  true},
            SubmittdFrom: { name: 'SubmittedFromDate', type: Type.TIMESTAMP },
            SubmittedTo: { name: 'SubmittedToDate', type: Type.TIMESTAMP }
        },
        data: 'FeedSubmissionInfo'
    },

    GetFeedSubmissionResult: {
        params: {
            FeedSubmissionId: { required }
        },
        basePath: 'AmazonEnvelope.Message',
        data: 'ProcessingReport'
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests
};
