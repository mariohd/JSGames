function RemoteData(appKey, jsKey) {
	Parse.initialize(appKey, jsKey);
	var script = document.createElement('script');
	script.src = 'https://www.telize.com/geoip?callback=RemoteData.prototype.saveLocation';
	document.body.appendChild(script);
};

RemoteData.defaults = {
	options: {
		success: function() {},
		error: function() {
			console.log("Error: ", error.code, error.message);
		}
	}
};

RemoteData.prototype = {
	get: function (from, options) {
		options = this._extend(RemoteData.defaults.options, options);
		var Table = Parse.Object.extend(from);
		var table = new Table();
		table.find({
			success: options.success,
			error: options.error
		});
	},

	send: function (to, what, options) {
		options = this._extend(RemoteData.defaults.options, options);
		var Table = Parse.Object.extend(to);
		var table = new Table();
		table.save(what).then(options.success);
	},

	saveLocation: function (json) {
		this.send("Connections",
			{ 	
				ip: json.ip, 
				country: json.country, 
				country_code: json.country_code
			});
	},

	_extend: function () {
		 for(var i=1; i<arguments.length; i++)
	        for(var key in arguments[i])
	            if(arguments[i].hasOwnProperty(key))
	                arguments[0][key] = arguments[i][key];
	    return arguments[0];
	}
};
