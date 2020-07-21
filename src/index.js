const operations = require('./operations.js');
const objects = require('./objects.js');
const parse = require('./parser.js');

module.exports = { ...operations, ...objects, parse };
