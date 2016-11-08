import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    name: 'Reports',
    path: '/',
    version: '2009-01-01',
    legacy: true
};

export default createAPI(api, apiDefaults);
