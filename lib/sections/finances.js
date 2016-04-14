'use strict';

const _ = require('lodash');
const Enum = require('../enum');

const requestDefaults = {
    name: 'Finances',
    group: 'Finances',
    path: '/Finances/2015-05-01',
    version: '2015-05-01'
};

const enums = {
    ItemConditions: function () {
        return new mws.Enum(['New', 'Used', 'Collectible', 'Refurbished', 'Club']);
    }
};

const requests = {
    GetServiceStatus: {},

    ListFinancialEventGroups: {
        params: {
            MaxResultsPerPage: { name: 'MaxResultsPerPage' },
            FinancialEventGroupStartedAfter: { name: 'FinancialEventGroupStartedAfter', required: true },
            FinancialEventGroupStartedBefore: { name: 'FinancialEventGroupStartedBefore' }
        }
    },

    /**
     * Returns the next page of financial event groups using the NextToken parameter.
     */
    ListFinancialEventGroupsByNextToken: {
        params: {
            NextToken: { name: 'NextToken', required: true }
        }
    },

    /**
     * Returns financial events for a given order, financial
     * event group, or date range.
     */
    ListFinancialEvents: {
        params: {
            MaxResultsPerPage: { name: 'MaxResultsPerPage' },
            AmazonOrderId: { name: 'AmazonOrderId' },
            FinancialEventGroupId: { name: 'FinancialEventGroupId' },
            PostedAfter: { name: 'PostedAfter' },
            PostedBefore: { name: 'PostedBefore' }
        }
    },

    /**
     * Returns the next page of financial events using
     * the NextToken parameter.
     */
    ListFinancialEventsByNextToken: {
        params: {
            NextToken: { name: 'NextToken', required: true }
        }
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests
};
