import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    group: 'Finances',
    name: 'Finances',
    path: '/Finances/2015-05-01',
    version: '2015-05-01'
};

export default createAPI(api, apiDefaults);
