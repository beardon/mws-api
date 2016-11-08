import _ from 'lodash';
import Promise from 'bluebird';
import request from 'request';
import xmlParser from 'xml2json';
import iconv from 'iconv-lite';

import { BODY, ListType } from './types';
import { maybeArrayify, md5, throwIfError, getMetadata } from './util';
import signify from './signify';

Promise.promisifyAll(request);

export default class Request {
    constructor(options, args = {}) {
        this.api = _.defaults(_.pick(options, 'path', 'version', 'legacy', 'upload'), {
            path: '/',
            version: '2009-01-01',
            legacy: false
        });

        this.action = options.action || 'GetServiceStatus';

        const params = _.mapValues(
            options.params,
            (param, name) => {
                if (!param.name) {
                    return { ...param, name };
                }

                return param;
            }
        );

        this.params = _.reduce(
            params,
            (memo, param) => ({ ...memo, [param.name]: param }),
            {}
        );

        this.paramsMap = _.reduce(
            params,
            (memo, param, name) => ({ ...memo, [name]: param.name }),
            {}
        );

        this.values = {};
        this.options = _.omit(options, 'path', 'version', 'legacy', 'upload', 'action', 'params');

        if (!this.options.basePath) {
            this.options.basePath = `${this.action}Response.${this.action}Result`;
        }

        if (!this.options.next) {
            const nextAction = /ByNextToken$/.test(this.action) ? this.action : `${this.action}ByNextToken`;
            const nextName = this.options.nextName || this.options.name;

            this.options.next = `${nextName}.${nextAction}`;
        }

        this.values = this.getValues(args);

        this.checkForMissingParams();

        this.validate();
    }

    getParam(name) {
        let paramName = name;

        if (this.paramsMap[paramName]) {
            paramName = this.paramsMap[paramName];
        }

        const param = this.params[paramName];

        if (!param) {
            throw new Error(`Unknown param: ${paramName}`);
        }

        return param;
    }

    getData(data) {
        return {
            result: this.getResult(data),
            nextToken: this.getNextToken(data),
            metadata: getMetadata(data)
        };
    }

    getResult(data) {
        let path = this.options.basePath;

        if (this.options.data) {
            path = `${path}.${this.options.data}`;
        }

        const { isArray } = this.options;

        return maybeArrayify(isArray, path ? _.get(data, path) : data);
    }

    getNextToken(data) {
        const nextTokenPath = `${this.options.basePath}.NextToken`;
        const nextToken = _.get(data, nextTokenPath);

        if (nextToken === 'none') {
            return null;
        }

        return nextToken;
    }

    getValues(args) {
        return _.reduce(
              args,
              (memo, value, key) => ({ ...memo, ...this.getValue(key, value) }),
              {}
        );
    }

    getValue(paramName, value) {
        if (value == null) {
            return {};
        }

        const param = this.getParam(paramName);

        const typedValue = param.type.create(value);

        return typedValue.getParam(param.name);
    }

    checkForMissingParams() {
        const missing = _.filter(this.params, (param) => {
            const isList = param.type instanceof ListType;
            const isRequired = param.required;

            if (!isRequired) {
                return false;
            }

            const value = isList ? this.values[`${param.name}.1`] : this.values[param.name];

            return value == null;
        });

        if (missing.length > 0) {
            throw new Error(`ERROR: Missing required parameter${missing.length > 1 ? 's' : ''}: ${_.map(missing, 'name').join(', ')}!`);
        }
    }

    validate() {
        const validations = _.map(this.params, (param) => param.validate(this));

        console.log(validations);
    }

    exec(client, meta) {
        const { action, api } = this;
        const { body, ...values } = this.values;
        const { host, userAgent, accessKeyId, authToken, merchantId, secretAccessKey } = client;

        const uri = `https://${host}${api.path}`;
        const requestOpts = {};

        const headers = {
            Host: host,
            'User-Agent': userAgent
        };

        const hasBody = _.findKey(this.params, { type: BODY });

        // check if we're dealing with a file upload (such as a feed)
        if (api.upload && hasBody) {
            requestOpts.body = body;

            headers['Content-Type'] = /^<\?xml/.test(body) ? 'text/xml; charset=iso-8859-1' : meta.contentType;
            headers['Content-MD5'] = md5(body);
        }

        const data = {
            ...values,
            Action: action,
            AWSAccessKeyId: accessKeyId,
            MWSAuthToken: authToken,
            Timestamp: new Date().toISOString(),
            Version: api.version,
            [api.legacy ? 'Merchant' : 'SellerId']: merchantId
        };

        const signedData = signify(host, api.path, data, secretAccessKey);

        requestOpts[api.upload ? 'qs' : 'form'] = signedData;

        requestOpts.headers = headers;

        return request.postAsync(uri, requestOpts)
            .then(({ body }) => { // eslint-disable-line
                if (body.slice(0, 5) !== '<?xml') {
                    const result = iconv.decode(new Buffer(body), 'iso-8859-1');
                    const metadata = null;

                    return { result, metadata };
                }

                const parsed = JSON.parse(xmlParser.toJson(body));

                return throwIfError(parsed).then(() => this.getData(parsed));
            });
    }
}
