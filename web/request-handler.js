var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var requestRouter = {
    "GET": {
      code: 200,
      handler: handleGET
    },
    "POST": {
      code: 200,
      handler: handlePOST
    }
  };

  var statusCode = requestRouter[req.method].code || 404;
  res.writeHead(statusCode, helpers.headers);

  if (requestRouter[req.method]){
    requestRouter[req.method].handler(req, res);
  }

  if (statusCode === 404){
    res.end();
  }

};

var handleGET = function(req, res){
  fs.readFile(archive.paths.siteAssets + "/index.html", function(err, data){
    if (err){throw err;}
    res.end(data);
  });
};

var handlePOST = function(req, res){
  var postData = "";
  req.on('data', function(chunk){
    postData += chunk;
  });
  // req.on('end', function(){
  //   //call does exist?
  //   console.log(fs.existsSync(archive.paths.archivedSites + '/'+'www.google.com'));
  //   fs.readFile(archive.paths.archivedSites + '/' + postData.split('=')[1], function(err, data){
  //     if (err){throw err;}
  //     res.end(data);
  //   });
  // });
  var err = function(){
    console.log('oops');
  };
  req.on('end', function(){
    postData = archive.paths.archivedSites + '/' + postData.split('=')[1];
    archive.isURLArchived(postData, fs.readFile, err, res);
  });


};

// var addThing = function(){
//   console.log('things')
// }










