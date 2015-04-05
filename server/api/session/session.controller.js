/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /session              ->  index
 */

'use strict';

var _ = require('lodash');

// Get Data
exports.index = function(req, res) {
  var response = {};

  response.user_active = req.session.credentials ? true : false;

  res.json(response);
};