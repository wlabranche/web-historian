var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  //console.log('FIRST Response', res);
  var requestRouter = {
    "GET": {
      code: 200,
      handler: handleGET
    },
    "POST": {
      code: 200,
      handler: handlePOST
    },
    "OPTIONS": {
      code: 200,
      handler: handleOPTIONS
    }
  };
  console.log(req.url);
  var statusCode = requestRouter[req.method].code || 404;

  if (statusCode === 404){
    res.end();
  }

  if (requestRouter[req.method]){
    requestRouter[req.method].handler(req, res);
  }


};

var handleGET = function(req, res){

  var routes = {
    '/': '/index.html',
    '/favicon.ico': '/index.html'
  };

  var source = routes[req.url] || req.url;
  // res.writeHead(200, helpers.headers);

  helpers.serveAssets(res, source);


};

// exports.readListOfUrls = function(location, callback){
//   fs.readFile(location, function(err, data){
//     if (err){ throw err;}
//     callback(data);
//   });
// };


var handlePOST = function(req, res){
  var postData = "";
  req.on('data', function(chunk){
    postData += chunk;
  });

  req.on('end', function(){
    postData = '/' + postData.split('=')[1];
    helpers.serveFile(res, postData);
  });
};

var handleOPTIONS = function(){

};










