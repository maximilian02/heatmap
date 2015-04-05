/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /data              ->  index
 * POST    /data              ->  create
 * GET     /data/:id          ->  show
 * PUT     /data/:id          ->  update
 * DELETE  /data/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get Data
exports.index = function(req, res) {
  var response = {};

  response.user_active = req.session.credentials ? true : false;

  res.json(response);
};