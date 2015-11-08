angular
  .module('hi5')
  .controller('ViewController', function($scope, supersonic, $timeout) {
    $timeout(supersonic.ui.layers.pop(), 2000);

  });
