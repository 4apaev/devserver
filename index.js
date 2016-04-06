exports.body = require("./middleware/body");
exports.fail = require("./src/fail");
exports.favicon = require("./middleware/favicon");
exports.json = require("./middleware/json");
exports.logger = require("./middleware/logger");
exports.query = require("./middleware/query");
exports.server = require("./src/server");
exports.statiq = require("./src/statiq");