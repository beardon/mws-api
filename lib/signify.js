import _ from 'lodash';
import crypto from 'crypto';
import qs from 'querystring';

const SignatureMethod = 'HmacSHA256';
const SignatureVersion = '2';

function sortObjectByKeys(object) {
    return _.reduce(
        _.keys(object).sort(),
        (m, k) => (object[k] ? { ...m, [k]: object[k] } : m),
        {}
    );
}

function getSortedQueryString(object) {
    const sortedObject = sortObjectByKeys(object);

    return qs.stringify(sortedObject);
}

export default function signify(host, path, object, secretAccessKey) {
    const querystring = getSortedQueryString({ ...object, SignatureMethod, SignatureVersion });

    const stringToSign = ['POST', host, path, querystring]
        .join('\n')
        .replace(/'/mg, '%27')
        .replace(/\*/mg, '%2A')
        .replace(/\(/mg, '%28')
        .replace(/\)/mg, '%29');

    const Signature = crypto.createHmac('sha256', secretAccessKey)
        .update(stringToSign, 'utf8')
        .digest('base64');

    return {
        ...object,
        Signature,
        SignatureMethod,
        SignatureVersion
    };
}
