'use strict';

import _ from 'lodash';
const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-as-promised'));

const expect = require('chai').expect;

const createSection = require('..');

describe('feeds', function () {
    it('should do thing', function () {
        const fetch = sinon.stub();

        const section = createSection({ fetch });

        const cancelFeedSubmissions = sinon.stub(section, 'CancelFeedSubmissions');

        const x = cancelFeedSubmissions({ test: 1 });
    });
});
