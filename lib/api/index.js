import _ from 'lodash';

const DEFAULTS = {
    isArray: false,
    legacy: false,
    upload: false,
    validate: () => true
};

export default function createAPI(requests, requestDefaults) {
    return (client) => _.mapValues(requests, (definition, action) => {
        const defaults = _.defaults({ action }, requestDefaults, DEFAULTS);

        return (args, meta) => {
            const opts = _.defaults(definition, defaults);

            return client.fetch(opts, args, meta);
        };
    });
}
