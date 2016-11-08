import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    name: 'Recommendations',
    path: '/Recommendations/2013-04-01',
    version: '2013-04-01'
};

export default createAPI(api, apiDefaults);
