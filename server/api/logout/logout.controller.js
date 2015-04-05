'use strict';

var _ = require('lodash'),
    https = require('https');

exports.post = function(req, res) {
  req.session.credentials = undefined;
  res.json({'status': true});
}