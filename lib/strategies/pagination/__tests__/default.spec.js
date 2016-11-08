import _ from 'lodash';

import chai from 'chai';

chai.use(require('chai-as-promised'));

const { expect } = chai;

import paginateFactory from '../default';

describe('strategies', function () {
    describe('pagination', function () {
        describe('default', function () {
            it('should handle non-array result', function () {
                const data = {
                    result: {
                        test: 'data'
                    },
                    nextToken: null,
                    metadata: {}
                };

                const paginate = paginateFactory();

                const result = paginate(data, {}).get('result');

                expect(result).to.eventually.deep.equal(data.result);
            });

            it('should handle array result without a nextToken', function () {
                const data = {
                    result: [{
                        test: 'data'
                    }],
                    nextToken: null,
                    metadata: {}
                };

                const paginate = paginateFactory();

                const result = paginate(data, {}).get('result');

                expect(result).to.eventually.deep.equal(data.result);
            });

            it('should handle array result with a nextToken', function () {
                const data = {
                    result: [{
                        test: 'data'
                    }],
                    nextToken: 'nextToken',
                    metadata: {}
                };

                const data2 = {
                    result: [{
                        test2: 'data2'
                    }],
                    nextToken: null,
                    metadata: {}
                };

                const meta = {};

                const next = (nextData, nextMeta) => {
                    expect(nextData).to.deep.equal({ NextToken: data.nextToken });

                    return paginate(data2, nextMeta);
                };

                const paginate = paginateFactory();

                const result = paginate(data, {}, next).get('result');

                expect(result).to.eventually.deep.equal(_.concat(data.result, data2.result));
            });

            it('should handle array result with a nextToken with a limit of 0', function () {
                const data = {
                    result: [{
                        test: 'data'
                    },
                    {
                        test2: 'data2'
                    }],
                    nextToken: 'nextToken',
                    metadata: {}
                };

                const paginate = paginateFactory({ limit: 0 });

                const result = paginate(data, {}).get('result');

                expect(result).to.eventually.deep.equal([]);
            });

            it('should handle array result with a nextToken with a limit of 1', function () {
                const data = {
                    result: [{
                        test: 'data'
                    },
                    {
                        test2: 'data2'
                    }],
                    nextToken: 'nextToken',
                    metadata: {}
                };

                const paginate = paginateFactory({ limit: 1 });

                const result = paginate(data, {}).get('result');

                expect(result).to.eventually.deep.equal(data.result.slice(0, 1));
            });

            it('should handle array result with a nextToken with a limit with pagination', function () {
                const data = {
                    result: [{
                        test: 'data'
                    },
                    {
                        test2: 'data2'
                    }],
                    nextToken: 'nextToken',
                    metadata: {}
                };

                const data2 = {
                    result: [{
                        test3: 'data3'
                    },
                    {
                        test4: 'data4'
                    }],
                    nextToken: 'nextToken2',
                    metadata: {}
                };

                const data3 = {
                    result: [{
                        test5: 'data5'
                    },
                    {
                        test6: 'data6'
                    }],
                    nextToken: 'nextToken',
                    metadata: {}
                };

                const paginate = paginateFactory({ limit: 5 });

                 const next2 = (nextData, nextMeta) => {
                    expect(nextData).to.deep.equal({ NextToken: data2.nextToken });
                    expect(nextMeta).to.deep.equal({ pagination_results: data.result.length + data2.result.length });

                    return paginate(data3, nextMeta);
                };

                const next = (nextData, nextMeta) => {
                    expect(nextData).to.deep.equal({ NextToken: data.nextToken });
                    expect(nextMeta).to.deep.equal({ pagination_results: data.result.length });

                    return paginate(data2, nextMeta, next2);
                };

                const result = paginate(data, {}, next).get('result');

                expect(result).to.eventually.deep.equal(_.concat(data.result, data2.result, data3.result).slice(0, 5));
            });
        });
    });
});
