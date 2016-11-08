import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    name: 'MerchantFulfillment',
    path: '/MerchantFulfillment/2015-06-01',
    version: '2015-06-01'
};

export default createAPI(api, apiDefaults);
