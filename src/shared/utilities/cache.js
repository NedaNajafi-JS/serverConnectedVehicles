const NodeCache = require('node-cache');
'use strict'

class Cache {
    constructor() {
        this.cache = new NodeCache();
    }

    get(key, storeFunction) {

        const value = this.cache.get(key);
        if (value) {
            return value;
        }

        const setValue = this.setKey(key);

        return storeFunction().then(setValue)

    }

    set(key, storeFunction) {

        this.cache.set(key, storeFunction() || '');
    }

    setKey = (key) => value => {
        this.cache.set(key, value);
        return value;
    }

    take(key) {
        return Promise.resolve(this.cache.take(key));
    }

    async push(key, ...value) {
        let result = await this.take(key);
        (result ? result : []).push(...value);
        this.cache.set(key, result);
        return result;

    }

    del(keys) {

    }

    flush() {
        this.cache.flushAll();
    }
}

module.exports = Cache;