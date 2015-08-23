function RemoteData(appKey, jsKey) {
	Parse.initialize(appKey, jsKey);
	this.ipAddress = "unknown";
	this.country = "world";
};

RemoteData.prototype = {
	get: function (what, options) {
		var Table = Parse.Object.extend(what);
		var table = new Table();
		table.find({
			success: options.success,
			error: function(error) {
				console.log("Error: ", error.code, error.message);
			}
		});
	},

	send: function (what, options) {
		var Table = Parse.Object.extend(what);
		var table = new Table();
		table.save(what).then(options.success);
	}
};

RemoteData.ipLocation = function (json) {
	this.ipAddress = json.ip || this.ip;
	this.country = json.country || this.country;
};

(function () {
	var script = document.createElement('script');
	script.src = 'https://www.telize.com/geoip?callback=RemoteData.ipLocation';
	document.body.appendChild(script);
}());
