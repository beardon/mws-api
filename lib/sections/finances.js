'use strict';

const _ = require('lodash');
const Enum = require('../enum');
const Type = require('../types');

const required = true;
const isArray = true;

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
            MaxResultsPerPage: {},
            FinancialEventGroupStartedAfter: { required, type: Type.TIMESTAMP },
            FinancialEventGroupStartedBefore: { type: Type.TIMESTAMP }
        },
        data: 'FinancialEventGroupList.FinancialEventGroup',
        isArray
    },

    ListFinancialEventGroupsByNextToken: {
        params: {
            NextToken: { required }
        }
        data: 'FinancialEventGroupList.FinancialEventGroup',
        isArray
    },

    ListFinancialEvents: {
        params: {
            MaxResultsPerPage: {},
            AmazonOrderId: { name: 'AmazonOrderId' },
            FinancialEventGroupId: { name: 'FinancialEventGroupId' },
            PostedAfter: { type: Type.TIMESTAMP },
            PostedBefore: { type: Type.TIMESTAMP }
        }
    },

    ListFinancialEventsByNextToken: {
        params: {
            NextToken: { required }
        }
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests
};
