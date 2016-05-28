var db = require('../db');
var marvelService = require('../../service/marvelService');

exports.find = function(params, callback) {

	var find = db.get().collection("Character").find();

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

exports.insertMany = function(characters) {
	db.get().collection("Character").insertMany(characters);
}


exports.upsertMany = function(characters) {
	characters.forEach(function(character) {
		db.get().collection("Character").update({id: character.id}, character, {upsert:true});
	});
}

exports.deleteAll = function() {
	db.get().collection("Character").remove();
}

exports.count = function(callback) {
	db.get().collection("Character").count(function(err, count){
		callback(count);
	});
}