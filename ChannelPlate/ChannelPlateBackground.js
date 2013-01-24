// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2013 Google Inc. johnjbarton@google.com

// Add this to the manifest.json:
// "background": {
//      "scripts": ["ChannelPlate/ChannelPlate.js", "ChannelPlate/RemoteMethodCall.js", ChannelPlate/ChannelPlateBackground.js"] // workaround CSP
//    },


var DEBUG = false;

var ChromeBackgroundMethods = {};

// Cross site XHR, xhr(url) -> content 
//
ChromeBackgroundMethods.request = function(method, url, callback, errback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.addEventListener('load', function(e) {
    if (xhr.status == 200 || xhr.status == 0) {
      if (DEBUG) 
        console.log("end xhr "+url);
      
      callback(xhr.responseText);
    } else {
      if (DEBUG) 
        console.error("err xhr "+url);

      errback(xhr.status);
    }
  }.bind(this), false);
  var onFailure = function() {
    errback.apply(null, arguments);
  }.bind(this);
  xhr.addEventListener('error', onFailure, false);
  xhr.addEventListener('abort', onFailure, false);
  xhr.send();
};


// Cross site XHR, xhr(url) -> content 
//
ChromeBackgroundMethods.xhr = function(url, callback, errback) {
  if (DEBUG)
    console.log("start xhr "+url);
  this.request('GET', url, callback, errback);
};

ChromeBackgroundMethods.GET = function(url, callback, errback) {
  this.request('GET', url, callback, errback);
};

// Cross site XHR WebDAV, xhr(url) -> content 
//
ChromeBackgroundMethods.PUT = function(url, callback, errback) {
  this.request('PUT', url, callback, errback);
};

// Cross site XHR WebDAV, xhr(url) -> content 
//
ChromeBackgroundMethods.PROPFIND = function(url, callback, errback) {
  this.request('PROPFIND', url, callback, errback);
};


var server = new RemoteMethodCall.Responder(ChromeBackgroundMethods, ChannelPlate.ChromeBackgroundListener);
    server.start();
