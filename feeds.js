'use strict';

const _ = require('lodash');

module.exports = _.assign({},
    require('./lib/feeds/fulfillment'),
    require('./lib/feeds/orders'),
    require('./lib/feeds/products')
);
