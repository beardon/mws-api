'use strict';

function errorNotImplemented(feed) {
    return function () {
        return Promise.reject(new Error(`The feed ${feed} is not implemented`));
    };
};

module.exports = {
    errorNotImplemented
};
