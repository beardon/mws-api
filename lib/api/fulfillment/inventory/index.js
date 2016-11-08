import createAPI from '../../index';
import * as api from './api';

const apiDefaults = {
    name: 'Fulfillment',
    nextName: 'FulfillmentInventory',
    path: '/FulfillmentInventory/2010-10-01',
    version: '2010-10-01'
};

export default createAPI(api, apiDefaults);
