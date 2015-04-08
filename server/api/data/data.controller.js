/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /data              ->  index
 * POST    /data              ->  create
 * GET     /data/:id          ->  show
 * PUT     /data/:id          ->  update
 * DELETE  /data/:id          ->  destroy
 */

'use strict';

var _ = require('lodash'),
    https = require('https');

// Get Data
exports.index = function(req, res) {
	var response = {},
		chunk = '';

	var setResponseData = function(statusCode, obj) {
	    return  {
	              'statusCode': statusCode,
	              'object': obj,
	            };
	 };

	// prepare the header
	var optionsget = {
		host: 'api-admin-staging.techcareinc.com',
	    // port: 8000,
	    path: '/visits?page=' + req.query.page,
	    headers: {
	     'Authorization': 'Bearer ' + req.session.credentials.token
	   }    
	};

	// do the GET call
	var reqPost = https.get(optionsget, function(httpsRes) {
		httpsRes.on('data', function(d) {
			chunk += d.toString('utf8');
	  	});

	  	httpsRes.on('end', function(d) {
	  		res.json(setResponseData(httpsRes.statusCode, JSON.parse(chunk)));
	  	});
	});
   
	// write the json data
	reqPost.end();
	reqPost.on('error', function(e) {
	  console.error(e);
	});
};