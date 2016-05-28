(function() {

	var app = angular.module('marvel', [ 'ngRoute', 'ui.bootstrap', 'charModal' ]);

	app.controller('charactersController', [ '$http', '$uibModal', '$routeParams', '$route', function($http, $uibModal, $routeParams, $route) {
		var container = this;
		
		this.characters = [];
		this.pages = [];

    	this.totalPages = 0;
  		this.currentPage = $routeParams.page ? $routeParams.page : 1;
  		this.maxSize = 5;
  		this.pageSize = 100;
  		
  		var total = $http.get('/characters/total');
		total.success(function(response) {
			var pages = [];
			container.totalPages = Math.ceil(parseInt(response) / container.pageSize);
			for (i = 1; i <= container.totalPages; i++) {
				pages.push(i);
			}
			container.pages = pages;
		});

		var offset = this.currentPage * this.pageSize;
		var page = $http.get('/characters', {params: {offset: offset, limit: this.pageSize}});
		page.success(function(response) {
			container.characters = response;
		});

		this.selectCharacter = function(index) {
			var idx = index;
			$uibModal.open({
	    		templateUrl: 'views/characterModal.html',
      			controller: 'characterModalCtrl as modal',
      			size: 'lg',
      			animation: true,
      			resolve: {
        			character: function() {
        				return container.characters[idx];
        			}
        		}
      		});
    	};

    }]);

	app.controller('comicsController', [ '$http', '$routeParams', '$route', function($http, $routeParams, $route) {
		var container = this;
		
		this.comics = [];
		this.pages = [];

    	this.totalPages = 0;
  		this.currentPage = $routeParams.page ? $routeParams.page : 1;
  		this.maxSize = 5;
  		this.pageSize = 100;
  		
  		var total = $http.get('/comics/total');
		total.success(function(response) {
			var pages = [];
			container.totalPages = Math.ceil(parseInt(response) / container.pageSize);
			for (i = 1; i <= container.totalPages; i++) {
				pages.push(i);
			}
			container.pages = pages;
		});

		var offset = this.currentPage * this.pageSize;
		var page = $http.get('/comics', {params: {offset: offset, limit: this.pageSize}});
		page.success(function(response) {
			container.comics = response;
		});

    }]);

	$(window).load(function(){
   		$('#overlay').fadeOut(1200);
	});

})();