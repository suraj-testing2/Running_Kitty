

var ChromeBackgroundMethods = {
	GET: function(url, callback, errback) {}
};


var proxy = (new RemoteMethodCall.Requestor(ChromeBackgroundMethods, ChannelPlate.DevtoolsTalker)).serverProxy();
    proxy.GET(
    	'http://example.com',
    	function(result) {
    		console.log("result: " + result);
    	},
    	function(err) {
    		console.error("err: " + err);
    	}
    );