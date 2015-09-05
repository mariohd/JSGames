RemoteData.prototype.robinMoody = {
	getSkulls: function (callback) {
		RemoteData.prototype.get('Skulls', {
			success: function (data) {
				callback(data[0].get('amount'));
			}
		});
	}	
};