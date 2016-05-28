var express = require('express');
var characters = require('../persistence/dao/characterDAO');
var comics = require('../persistence/dao/comicDAO');
var router = express.Router();
var cron = require('../service/cronService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/characters', function(req, res) {
	characters.find({offset: req.query.offset, limit: req.query.limit}, function(docs) {
		res.send(docs);
	});
});

router.get('/characters/total', function(req, res) {
	characters.count(function(count) {
		res.send(count.toString());
	});
});

router.get('/comics', function(req, res) {
	comics.find({offset: req.query.offset, limit: req.query.limit}, function(docs) {
		res.send(docs);
	});
});

router.get('/comics/total', function(req, res) {
	comics.count(function(count) {
		res.send(count.toString());
	});
});

router.get('/jobs/refresh/characters', function(req, res) {
	cron.characters.fireOnTick();
	res.json("Job started");
});

router.get('/jobs/refresh/comics', function(req, res) {
	cron.comics.fireOnTick();
	res.json("Job started");
});

module.exports = router;
