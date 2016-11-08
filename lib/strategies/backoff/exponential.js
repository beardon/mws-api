import _ from 'lodash';
import Promise from 'bluebird';

const DEFAULT_CONFIG = {
    max_backoff: 30000,
    max_attempts: Infinity
};

export default function factory(customConfig = {}) {
    const config = _.defaults(customConfig, DEFAULT_CONFIG);

    return Promise.method((err, meta, next) => {
        const attempt = (meta.attempt || 0) + 1;

        if (attempt > config.max_attempts) {
            throw err;
        }

        const backoffDuration = Math.min(100 * (2 ** attempt), config.max_backoff);

        return Promise.delay(backoffDuration).then(() => next({ ...meta, attempt }));
    });
}
