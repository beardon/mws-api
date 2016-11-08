import _ from 'lodash';
import Promise from 'bluebird';

const DEFAULT_CONFIG = {
    limit: Infinity,
    paginate: true
};

export default function factory(customConfig) {
    const config = _.defaults(customConfig || {}, DEFAULT_CONFIG);

    return Promise.method((data, meta, next) => {
        const { result, metadata, nextToken } = data;

        // do nothing if the result is not an array
        if (!Array.isArray(result)) {
            return { result, metadata };
        }

        // check to see if we have more results than requested
        if ((meta.pagination_results || 0) + result.length >= config.limit) {
            // if we're passed the limit but have never called next, we need to slice here
            if (!meta.pagination_results) {
                return {
                    result: result.slice(0, config.limit),
                    metadata
                };
            }

            return { result, metadata };
        }

        // if there's no more results, we're done
        if (!nextToken) {
            return { result, metadata };
        }

        // if we don't want to paginate at all
        if (!config.paginate) {
            return { result, metadata };
        }

        // increment the total number of results we have
        const nextMeta = {
            ...meta,
            pagination_results: (meta.pagination_results || 0) + result.length
        };

        return next({ NextToken: nextToken }, nextMeta)
            .then((nextData) => ({
                result: _.concat(result, nextData.result).slice(0, config.limit),
                metadata: _.concat(metadata, nextData.metadata)
            }));
    });
}
