import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    name: 'Subscriptions',
    path: '/Subscriptions/2013-07-01',
    version: '2013-07-01'
};

export default createAPI(api, apiDefaults);
