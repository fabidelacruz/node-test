var db = require('../db');
var marvelService = require('../../service/marvelService');

exports.find = function(params, callback) {

	var find = db.get().collection("Comic").find();

	if (params.offset != undefined) {
		find = find.skip(parseInt(params.offset));	
	}

	if (params.limit != undefined) {
		find = find.limit(parseInt(params.limit));	
	}
	 
	 find.sort({id: 1}).toArray(function(err, docs) {	 		
		callback(docs);
	});
}

exports.insertMany = function(comics) {
	db.get().collection("Comic").insertMany(comics);
}


exports.upsertMany = function(comics) {
	comics.forEach(function(comic) {
		db.get().collection("Comic").update({id: comic.id}, comic, {upsert:true});
	});
}

exports.deleteAll = function() {
	db.get().collection("Comic").remove();
}

exports.count = function(callback) {
	db.get().collection("Comic").count(function(err, count){
		callback(count);
	});
}