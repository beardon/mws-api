import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    name: 'Orders',
    path: '/Orders/2013-09-01',
    version: '2013-09-01'
};

export default createAPI(api, apiDefaults);
