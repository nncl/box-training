'use strict';

const Q = require('q');

let token = {
    'getToken': () => {
        var d = Q.defer();

        d.resolve('Nb9HaXDm288w5c52cEfZhzBVOv7snGsB');

        return d.promise;
    }
};

module.exports = token;
