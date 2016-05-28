var characters = require('../persistence/dao/characterDAO');
var comics = require('../persistence/dao/comicDAO');
var marvel = require('./marvelService');
var CronJob = require('cron').CronJob;

exports.comics = new CronJob({
		cronTime: '0 0 0/1 * * *',
		onTick: function() {
			var promise = marvel.getAllComics();
			promise.then(function(data) {
		 		comics.upsertMany(data);
		 		console.log("Update comics job finished");
		 	});
	  	}, 
	  	start: true,
	  	runOnInit: false
	});

exports.characters = new CronJob({
		cronTime: '0 0 0/1 * * *',
		onTick: function() {
			var promise = marvel.getAllCharacters();
			promise.then(function(data) {
		 		characters.upsertMany(data);
		 		console.log("Update characters job finished");
		 	});
	  	}, 
	  	start: true,
	  	runOnInit: false
	});