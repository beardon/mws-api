'use strict';

const _ = require('lodash');
const xml = require('xml');

let messageID = 1;

function visitEvery(fn) {
    return function visit(obj) {
        if (_.isObject(obj) && !_.isArray(obj)) {
            return fn(visit, obj);
        }

        if (_.isArray(obj)) {
            return _.map(obj, visit);
        }

        return obj;
    };
}

function arrayify(val) {
    return _.reduce(val, function (memo, val, key) {
        return _.concat(memo, { [key]: val });
    }, []);
}

const ensureArrays = visitEvery(function (visit, obj) {
    return _.mapValues(obj, function (val, key) {
        if (key === '_attr' || key === '_cdata' || !_.isObject(val)) {
            return val;
        }

        return visit(arrayify(val));
    });
});

const stripUndefined = visitEvery(function (visit, obj) {
    return _.reduce(obj, function (memo, val, key) {
        if (val !== undefined) {
            memo[key] = visit(val);
        }

        return memo;
    }, {});
});

const stripEmpty = visitEvery(function (visit, obj) {
    return _.reduce(obj, function (memo, val, key) {
        if (!_.isObject(val) || !_.isEmpty(val)) {
            memo[key] = visit(val);
        }

        return memo;
    }, {});
});

function AmazonEnvelope(data) {
    return {
        AmazonEnvelope: {
            _attr: {
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xsi:noNamespaceSchemaLocation': 'amzn-envelope.xsd'
            },
            Header: {
                DocumentVersion: 1.01,
                MerchantIdentifier: data.MerchantIdentifier
            },
            MessageType: data.MessageType,
            Message: data.Message
        }
    };
}

const createXML = _.flowRight(xml, ensureArrays, stripEmpty, stripUndefined);

function createEnvelope(fn) {
    return function (data) {
        data.PurgeAndReplace = data.PurgeAndReplace === 'true' || data.PurgeAndReplace === true ? 'true' : 'false';

        return '<?xml version="1.0" encoding="iso-8859-1"?>' + createXML(AmazonEnvelope(fn(_.assign({ MessageID: messageID++ }, data))));
    };
}

module.exports = {
    AmazonEnvelope,
    createEnvelope,
    createXML
};
