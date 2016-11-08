import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    name: 'Products',
    path: '/Products/2011-10-01',
    version: '2011-10-01'
};

export default createAPI(api, apiDefaults);
