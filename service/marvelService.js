var request = require('request');

var ts = 1;
var apiKey = "c15991866332f7e1584ee997f0d7f277";
var hash = "2d133d60460b838fee36b4b114b577d3";
var baseUrl = "http://gateway.marvel.com/v1/public/";

var doRequest = function (service, params) {
	var promise = new Promise(function(resolve, reject) {
		var qs = {ts: ts, apikey: apiKey, hash: hash};

		Object.keys(params).forEach(function(key) {
			qs[key] = params[key];
		});

		var options = { url: baseUrl + service, method: 'GET', qs: qs}

		request.get(options, function(error, response, body) {
			if (error) {
				console.log(error);
			} else {
				resolve(JSON.parse(body));
			}
		});
	});

	return promise;
}

var getAll = function(service) {
	var promise = new Promise(function(resolve, reject) {
		var list = [];
		var total;
		var offset = 0;
 
		var promiseFunction = function apply(body) {
			if (!total) {
				total = body.data.total;
			}

			if (body.data != undefined) {
				list = list.concat(body.data.results);
			} 
			offset += 100;

			if (offset < total) { 	
				var promise = doRequest(service, {limit:100, offset: offset});
				promise.then(apply);
			} else {
				resolve(list); 
			}

		}
		
		var promise = doRequest(service, {limit:100, offset: offset});
		promise.then(promiseFunction);			

	});

	return promise;
}

exports.getAllCharacters = function() {
	return getAll("characters");
}

exports.getAllComics = function() {
	return getAll("comics");
}