(function() {

	var app = angular.module('marvel');
	
	app.config(function($routeProvider) {
		$routeProvider.when('/characters', {
	    	templateUrl: 'views/characters.html',
	    	controller: 'charactersController as controller',
	    	reloadOnSearch: true
	    });

	    $routeProvider.when('/comics', {
	    	templateUrl: 'views/comics.html',
	    	controller: 'comicsController as controller',
	    	reloadOnSearch: true
	    });
	});

})();