(function() {

  var module = angular.module('charModal', [])

  module.controller('characterModalCtrl', function ($scope, $uibModalInstance, character) {
    this.character = character;

    $scope.ok = function () {
      $uibModalInstance.close();
    };
  });

})();