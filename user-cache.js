const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600 });

const set = (key, val) => {
	let result = cache.set(key, val);
	if (!result) {
		console.log(`Unable to log user to userCache: ${key}`);
	}
};

const get = key => {
	let result = cache.get(key);
	if (result == undefined) {
		throw `no item in cache with key ${key}`;
	}
	return result;
};

const take = key => {
	let result = cache.take(key);
	if (result == undefined) {
		throw `no item in cache with key ${key}`;
	}
	return result;
};

const del = key => {
	return cache.del(key);
};

const check = key => {
	return cache.has(key);
};

const list = () => {
	return cache.keys();
};

module.exports = {
	set: set,
	get: get,
	take: take,
	del: del,
	check: check,
	list: list
};
