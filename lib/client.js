'use strict';

const _ = require('lodash');
const crypto = require('crypto');
const Promise = require('bluebird');
const qs = require('querystring');
const request = require('request');
const tls = require('tls');
const parser = require('xml2json');
const Type = require('./types');

Promise.promisifyAll(request);

Promise.config({
    longStackTraces: true
});

const createCredentials = tls.createSecureContext || crypto.createCredentials;

function getMetadata(data) {
    return data[_.keys(data)[0]].ResponseMetadata;
}

class AmazonMwsClient {
    /**
     * Constructor for the main MWS client interface used to make api calls and
     * various data structures to encapsulate MWS requests, definitions, etc.
     *
     * @param {Object} options         configuration options for this instance
     */
    constructor(options) {
        const opts = _.defaultsDeep(options || {}, {
            host: 'mws.amazonservices.com',
            creds: {},
            appName: 'mws-api',
            appVersion: '0.1.0',
            appLanguage: 'JavaScript',
            meta: {
                retry: true,
                next: false,
                limit: Infinity,
                max_backoff: 10000,
                max_attempts: Infinity,
                attempt: -1,
                contentType: 'application/x-www-form-urlencoded',
                parseCSVResult: (data) => data
            }
        });

        if (!opts.accessKeyId || !opts.secretAccessKey || !opts.merchantId) {
            const missing = _.keys(_.pickBy({
                accessKeyId: opts.accessKeyId,
                secretAccessKey: opts.secretAccessKey,
                merchantId: opts.merchantId
            }, _.negate(_.identity)));

            throw new Error(`Missing Amazon client parameter${missing.length > 2 ? 's' : ''}: ${missing.join(', ')}!`);
        }

        this.host = opts.host;
        this.creds = createCredentials(opts.creds);
        this.appName = opts.appName;
        this.appVersion = opts.appVersion;
        this.appLanguage = opts.appLanguage;
        this.accessKeyId = opts.accessKeyId;
        this.secretAccessKey = opts.secretAccessKey;
        this.merchantId = opts.merchantId;
        this.authToken = opts.authToken;
        this.meta = opts.meta;

        _.merge(this, require('./api')(this));
    }

    request(req, q, meta) {
        const api = req.api;
        const action = req.action;
        const uri = `https://${this.host}${api.path}`;
        const requestOpts = {};
        const query = _.clone(q);

        const headers = {
            'Host': this.host,
            'User-Agent': `${this.appName}/${this.appVersion} (Language=${this.appLanguage})`
        };

        const body = _.findKey(req.params, { type: Type.BODY });

        // Check if we're dealing with a file (such as a feed) upload
        if (api.upload && body) {
            requestOpts.body = query[body];

            headers['Content-Type'] = /^<\?xml/.test(requestOpts.body) ? 'text/xml; charset=iso-8859-1' : meta.contentType;
            headers['Content-MD5'] = crypto.createHash('md5').update(requestOpts.body).digest('base64');
        }

        // Add required parameters and sign the query
        query.Action = action;
        query.Version = api.version;
        query.Timestamp = new Date().toISOString();
        query.AWSAccessKeyId = this.accessKeyId;

        if (this.authToken) {
            query.MWSAuthToken = this.authToken;
        }

        query[api.legacy ? 'Merchant' : 'SellerId'] = this.merchantId;

        const signedQuery = this.sign(api.path, _.omit(query, body));

        requestOpts[api.upload ? 'qs' : 'form'] = signedQuery;

        requestOpts.headers = headers;
        requestOpts.encoding = 'binary';

        return request.postAsync(uri, requestOpts);
    }

    /**
     * The method used to invoke calls against MWS Endpoints. Recommended usage is
     * through the invoke wrapper method when the api call you're invoking has a
     * request defined in one of the submodules. However, you can use call() manually
     * when a lower level of control is necessary (custom or new requests, for example).
     *
     * @param  {Object}   api      Settings object unique to each API submodule
     * @param  {String}   action   Api `Action`, such as GetServiceStatus or GetOrder
     * @param  {Object}   query    Any parameters belonging to the current action
     * @return Promise
     */
    call(req, q, meta) {
        return this.request(req, q, meta).then((response) => {
            const body = response.body;

            if (body.slice(0, 5) !== '<?xml') {
                return Promise.resolve(meta.parseCSVResult(body))
                    .then((result) => ({ result, metadata: null }));
            }

            const data = JSON.parse(parser.toJson(body));

            return Promise.try(() => {
                if (data.ErrorResponse) {
                    const error = data.ErrorResponse.Error;

                    const err = new Error(error.Message);
                    err.code = error.Code;
                    err.type = error.Type;

                    throw err;
                }

                const result = req.getResult(data);
                const nextToken = req.getNextToken(data);
                const metadata = [getMetadata(data)];

                if (!meta.next || !req.options.isArray) {
                    return { result, metadata };
                }

                if (result.length >= meta.limit || !nextToken) {
                    return {
                        result: result.slice(0, meta.limit),
                        metadata: metadata.slice(0, meta.limit)
                    };
                }

                const nextMeta = _.assign({}, meta, { limit: meta.limit - result.length });

                return _.get(this, req.options.next)({ NextToken: nextToken }, nextMeta)
                    .then(function (nextData) {
                        return {
                            result: _.concat(result, nextData.result),
                            metadata: _.concat(metadata, nextData.metadata)
                        };
                    });
            })
            .catch({ code: 'RequestThrottled' }, (err) => {
                if (!meta.retry) {
                    throw err;
                }

                const attempt = meta.attempt + 1;

                if (attempt > meta.max_attempts) {
                    throw err;
                }

                // simple exponential backoff for dealing with throttling
                const backoffDuration = Math.min(100 * Math.pow(2, attempt), meta.max_backoff);

                return Promise.delay(backoffDuration)
                    .then(() => this.call(req, q, _.assign({}, meta, { attempt })));
            })
            .catch({ code: 'QuotaExceeded' }, (err) => {
                if (!meta.retry) {
                    throw err;
                }

                const attempt = meta.attempt + 1;

                if (attempt > meta.max_attempts) {
                    throw err;
                }

                // simple exponential backoff for dealing with throttling
                const backoffDuration = Math.min(100 * Math.pow(2, attempt), meta.max_backoff);

                return Promise.delay(backoffDuration)
                    .then(() => this.call(req, q, _.assign({}, meta, { attempt })));
            });
        });
    }

    /**
     * Calculates the HmacSHA256 signature and appends it with additional signature
     * parameters to the provided query object.
     *
     * @param  {String} path  Path of API call (used to build the string to sign)
     * @param  {Object} query Any non-signature parameters that will be sent
     * @return {Object}       Finalized object used to build query string of request
     */
    sign(path, query) {
        query.SignatureMethod = 'HmacSHA256';
        query.SignatureVersion = '2';

        // Copy query keys, sort them, then copy over the values
        const sorted = _.reduce(_.keys(query).sort(), function (m, k) {
            m[k] = query[k];

            return m;
        }, {});

        const stringToSign = ['POST', this.host, path, qs.stringify(sorted)]
            .join('\n')
            .replace(/'/g, '%27')
            .replace(/\*/g, '%2A')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29');

        return _.assign({}, query, {
            Signature: crypto.createHmac('sha256', this.secretAccessKey)
                .update(stringToSign, 'utf8')
                .digest('base64')
        });
    }

    /**
     * Suggested method for invoking a pre-defined mws request object.
     *
     * @param  {Object}   req  An instance of AmazonMwsRequest with params, etc.
     * @param  {Object}   meta     Metadata to determine how to handle the request.
     * @return Promise
     */
    invoke(req, meta) {
        return req.query().then((q) => this.call(req, q, _.defaults(meta, this.meta)));
    }
}

module.exports = AmazonMwsClient;
