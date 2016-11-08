import createAPI from '../index';
import * as api from './api';

const apiDefaults = {
    legacy: true,
    name: 'Feeds',
    path: '/',
    version: '2009-01-01'
};

export default createAPI(api, apiDefaults);
