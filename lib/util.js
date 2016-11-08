import _ from 'lodash';
import crypto from 'crypto';
import Promise from 'bluebird';

export function toArray(val) {
    return Array.isArray(val) ? val : [val];
}

export function maybeArrayify(isArray, val) {
    if (isArray) {
        return _.compact(toArray(val));
    }

    return val;
}

export function md5(data) {
    return crypto.createHash('md5').update(data).digest('base64');
}

export const throwIfError = Promise.method((data) => {
    if (data.ErrorResponse) {
        const error = data.ErrorResponse.Error;

        const err = new Error(error.Message);
        err.code = error.Code;
        err.type = error.Type;

        throw err;
    }
});

export function getMetadata(data) {
    return data[_.keys(data)[0]].ResponseMetadata;
}
