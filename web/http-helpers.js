var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {

  var location = archive.paths.siteAssets + asset;
  res.writeHead(200, headers);

  fs.readFile(location, function(err, data){
    if (err){
      savedFile();
    }else{
      res.end(data);
    }
  });

  var savedFile = function(){
    var savedLocation = archive.paths.archivedSites + asset;
    fs.readFile(savedLocation, function(err,data){
      if (err){
        revertToLoad(res);
      }else{
        res.end(data);
      }
    });
  };

  // var revertToLoad = function(){
  //   var loading = archive.paths.siteAssets + '/loading.html';
  //   fs.readFile(loading, function(err, data){
  //     if (err){
  //       savedFile();
  //     }else{
  //       res.end(data);
  //     }
  //   });
  // };

};

exports.serveFile = function(res, file){

  var location = archive.paths.archivedSites + file;

  res.setHeader('location', 'http://127.0.0.1:8080' + file );

  fs.readFile(location, function(err, data){
    if (err){
      ruinLives(file);
      revertToLoad(res);
    }else {
      res.writeHead(302, headers);
      res.end(data);
      delete headers['location'];
    }
  });

};

var ruinLives = function(url){
  fs.appendFile(archive.paths.list, url.substring(1) + '\n', function (err) {
    if (err) throw err;
  });
};


var revertToLoad = function(res){
  var loading = archive.paths.siteAssets + '/loading.html';
  fs.readFile(loading, function(err, data){
    if (err){
      savedFile();
    }else{
      res.end(data);
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!
exports.getSetter = getSetter = function(path){
  return '<script type="text/javascript">window.location.href = "127.0.0.1:8080/' + path + '"</script>';
};
