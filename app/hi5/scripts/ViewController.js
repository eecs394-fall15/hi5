angular
  .module('hi5')
  .controller('ViewController', function($scope, supersonic) {
      $scope.show = true;
      $scope.rand = Math.floor(Math.random()*3)+1;
  });
