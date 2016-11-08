import _ from 'lodash';
import Promise from 'bluebird';

import AmazonMwsRequest from './request';
import createAPI from './api';
import defaultPaginationStrategyFactory from './strategies/pagination/default';
import defaulBackoffStrategyFactory from './strategies/backoff/exponential';

const DEFAULT_OPTIONS = {
    host: 'mws.amazonservices.com',
    appName: 'mws-api',
    appVersion: require('../package.json').version, // eslint-disable-line
    appLanguage: 'JavaScript'
};

const DEFAULT_META = {
    paginationStrategy: defaultPaginationStrategyFactory(),
    backoffStrategy: defaulBackoffStrategyFactory(),
    contentType: 'application/x-www-form-urlencoded'
};

export default class Client {
    constructor(customOptions, customMeta) {
        const options = _.defaults(customOptions || {}, DEFAULT_OPTIONS);
        const meta = _.defaults(customMeta || {}, DEFAULT_META);

        if (!options.accessKeyId || !options.secretAccessKey || !options.merchantId) {
            const missing = _.keys(_.pickBy({
                accessKeyId: options.accessKeyId,
                secretAccessKey: options.secretAccessKey,
                merchantId: options.merchantId
            }, _.negate(_.identity)));

            throw new Error(`Missing Amazon client parameter${missing.length > 2 ? 's' : ''}: ${missing.join(', ')}!`);
        }

        this.host = options.host;
        this.userAgent = `${options.appName}/${options.appVersion} (Language=${options.appLanguage})`;
        this.accessKeyId = options.accessKeyId;
        this.secretAccessKey = options.secretAccessKey;
        this.merchantId = options.merchantId;
        this.authToken = options.authToken;
        this.meta = meta;

        _.merge(this, createAPI(this));
    }

    fetch(opts, args, reqMeta) {
        return Promise.try(() => {
            const req = new AmazonMwsRequest(opts, args);
            const meta = _.defaults(reqMeta, this.meta);

            const onBackoffRequired = (err) => meta.backoffStrategy.call(this, err, _.clone(meta), _.bind(this.fetch, opts, args));

            return req.exec(this, meta).then((data) => meta.paginationStrategy.call(
                    this,
                    data,
                    _.clone(meta),
                    _.get(this, req.options.next)
                ))
                .catch({ code: 'RequestThrottled' }, onBackoffRequired)
                .catch({ code: 'QuotaExceeded' }, onBackoffRequired);
        });
    }
}
