const create = (proto, params) => Object.assign(Object.create(proto), params);

module.exports = { create };
