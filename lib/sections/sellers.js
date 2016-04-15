'use strict';

const _ = require('lodash');
const Enum = require('../enum');
const Type = require('../types');

const required = true;

const requestDefaults = {
    name: 'Sellers',
    group: 'Sellers Retrieval',
    path: '/Sellers/2011-07-01',
    version: '2011-07-01'
};

const types = {
    ServiceStatus: {
        'GREEN':'The service is operating normally.',
        'GREEN_I':'The service is operating normally + additional info provided',
        'YELLOW':'The service is experiencing higher than normal error rates or degraded performance.',
        'RED':'The service is unabailable or experiencing extremely high error rates.'
    }
};

const requests = {
    /**
     * Requests the operational status of the Sellers API section.
     */
    GetServiceStatus: {},

    ListMarketplaceParticipations: {},

    ListMarketplaceParticipationsByNextToken: {
        params: {
            NextToken: { required }
        }
    }
};

module.exports = {
    requestDefaults,
    requests,
    types
};
