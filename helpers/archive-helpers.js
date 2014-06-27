var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelp = require('../web/http-helpers.js');



/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(location, callback){
  fs.readFile(location, function(err, data){
    if (err){ throw err;}
    var result = '';
    console.log(JSON.stringify(data))
    for (var key in data){
      result += String.fromCharCode(data[key]);
    }
    if (callback(result)){
      //try to go to file
    }else{
      //write and update
    }
  });
};

exports.isUrlInList = function(data, target){
  target = target.slice(1);
  var urls = data.split('\n');
  for (var i = 0; i < urls.length; i++){
    if (urls[i] === target){
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(place){
  // var toWrite = "\n hey there";
  // fs.write(place, toWrite,null, toWrite.length, null, function(e, w,b){
  //   if (e){
  //     throw e;
  //   }
  //   console.log(w,b);
  // } );





};

exports.isURLArchived = function(path, location, fail, response){
  var source = path + '/' + location;

  fs.open(source, 'r', function(falsy){
    if (falsy){
      fail();
      response.end(source);
    }else{
      //succeed.call(null, source, function(falsy1, data){
        //if (falsy1){ throw falsy1;}
      response.write(httpHelp.getSetter(location));
      response.end();
        //response.end(data);
     // });
    }
  });
};

exports.downloadUrls = function(){
};

