'use strict';

var _ = require('lodash'),
    https = require('https');

exports.post = function(req, res) {
  console.info('user: ', req.body.username);
  console.info('pass: ', req.body.password);

  var setResponseData = function(statusCode, obj) {
    if (200 === statusCode) {
      req.session.credentials = {
        'token': obj.token,
        'userId': obj.userId
      }
    }

    return  {
              'statusCode': statusCode,
              'token': obj.token,
              'userId': obj.userId
            };
  };

  var jsonObj = JSON.stringify({
    "username" : req.body.username,
    "password" : req.body.password
  });

  // prepare the header
  var postheaders = {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(jsonObj, 'utf8')
  };

  var optionspost = {
    host: 'api-admin-staging.techcareinc.com',
    path: '/auth/sign-in',
    method: 'POST',
    headers : postheaders
  };

  // // console.info('optionspost prepared:');
  // // console.info(optionsget);
  // // console.info('Do the POST call');

  // do the POST call
  var reqPost = https.request(optionspost, function(httpsRes) {
      console.log("statusCode: ", httpsRes.statusCode);
      // console.log("headers: ", httpsRes.headers);
   
      httpsRes.on('data', function(d) {
          var jsonObj = JSON.parse(d);
          // console.info('POST result:\n');
          // process.stdout.write(d);
          // console.info('\n\nPOST completed');
          console.log('credentials: ', req.session.credentials);
          res.json(setResponseData(httpsRes.statusCode, jsonObj));
      });
  });
   
  // write the json data
  reqPost.write(jsonObj);
  reqPost.end();
  reqPost.on('error', function(e) {
      console.error(e);
  });
}