import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    name: 'Sellers',
    path: '/Sellers/2011-07-01',
    version: '2011-07-01'
};

export default createAPI(api, apiDefaults);
