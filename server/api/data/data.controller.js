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
	var response = {};

	console.log('REQ!!!!', req.query.page);

	var setResponseData = function(statusCode, obj) {
	    return  {
	              'statusCode': statusCode,
	              'object': obj,
	            };
	 };
	// if req.session.credentials
	console.log('TOKEN!: ', req.session.credentials.token);
	// auth is: 'Basic VGVzdDoxMjM='
	// prepare the header
	var optionsget = {
		host: 'api-admin-staging.techcareinc.com',
	    // port: 8000,
	    path: '/visits?page=' + req.query.page,
	    headers: {
	     'Authorization': 'Bearer ' + req.session.credentials.token
	   }    
	};

  // console.info('optionsget prepared:');
  // console.info(optionsget);
  // console.info('Do the POST call');

	// do the POST call
	var reqPost = https.get(optionsget, function(httpsRes) {
	  // console.log("statusCode: ", httpsRes.statusCode);
	  console.log("headers: ", httpsRes.headers);

	  httpsRes.on('data', function(d) {
	      var jsonObj = JSON.parse(d);
	      // console.info('GET result:\n');
	      // process.stdout.write(d);
	      // console.info('\n\nGET completed');
	      // console.log('credentials: ', req.session.credentials);
	      res.json(setResponseData(httpsRes.statusCode, jsonObj));
	  });
	});
   
	// write the json data
	// reqPost.write(optionsget);
	reqPost.end();
	reqPost.on('error', function(e) {
	  console.error(e);
	});

	// res.json(response);
};