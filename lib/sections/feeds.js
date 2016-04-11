'use strict';

const _ = require('lodash');
const Enum = require('../enum');

const requestDefaults = {
    name: 'Feeds',
    group: 'Feeds',
    path: '/',
    version: '2009-01-01',
    legacy: true
};

const enums = {
    FeedProcessingStatuses() {
        return new Enum(['_SUBMITTED_', '_IN_PROGRESS_', '_CANCELLED_', '_DONE_']);
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
    CancelFeedSubmissions: {
        params: {
            FeedSubmissionIds: { name: 'FeedSubmissionIdList.Id', list: true, required: false },
            FeedTypes: { name: 'FeedTypeList.Type', list:  true},
            SubmittdFrom: { name: 'SubmittedFromDate', type: 'Timestamp' },
            SubmittedTo: { name: 'SubmittedToDate', type: 'Timestamp' }
        }
    },

    GetFeedSubmissionList: {
        params: {
            FeedSubmissionIds: { name: 'FeedSubmissionIdList.Id', list: true, required: false },
            MaxCount: { name: 'MaxCount' },
            FeedTypes: { name: 'FeedTypeList.Type', list: true },
            FeedProcessingStatuses: { name: 'FeedProcessingStatusList.Status', list: true, type: 'bde.FeedProcessingStatuses' },
            SubmittedFrom: { name: 'SubmittedFromDate', type: 'Timestamp' },
            SubmittedTo: { name: 'SubmittedToDate', type: 'Timestamp' }
        }
    },

    GetFeedSubmissionListByNextToken: {
        params: {
            NextToken: { name: 'NextToken', required: true }
        }
    },

    GetFeedSubmissionCount: {
        params: {
            FeedTypes: { name: 'FeedTypeList.Type', list:  true},
            FeedProcessingStatuses: { name: 'FeedProcessingStatusList.Status', list: true, type: 'bde.FeedProcessingStatuses' },
            SubmittedFrom: { name: 'SubmittedFromDate', type: 'Timestamp' },
            SubmittedTo: { name: 'SubmittedToDate', type: 'Timestamp' }
        }
    },

    GetFeedSubmissionResult: {
        params: {
            FeedSubmissionId: { name: 'FeedSubmissionId', required: true }
        }
    },

    SubmitFeed: {
        params: {
          FeedContents: { name: '_BODY_', required: true },
          FeedType: { name: 'FeedType', required: true},
          MarketplaceIds: { name: 'MarketplaceIdList.Id', list: true, required: false },
          PurgeAndReplace: { name: 'PurgeAndReplace', required: false, type: 'Boolean' }
        },
        upload: true
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests
};
