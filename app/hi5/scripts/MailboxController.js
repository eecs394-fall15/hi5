angular
  .module('hi5')
  .controller('MailboxController', function($scope, supersonic, Requests) {
    $scope.showSpinner = true;
    $scope.highfives = null;

    $scope.loadHighfives = function(){
      Requests.loadHifives(function(highfives){
        $scope.$apply(function(){
          $scope.showSpinner = false;
          $scope.highfives = highfives;
        });
      });
    }

    $scope.loadHighfives();
  });
