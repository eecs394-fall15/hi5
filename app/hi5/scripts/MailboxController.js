angular
  .module('hi5')
  .controller('MailboxController', function($scope, supersonic, Requests) {
    $scope.showSpinner = true;
    $scope.highfives = null;


    $scope.loadHighfives = function(){
      Requests.loadHighfives(function(highfives){
        $scope.$apply(function(){
          $scope.showSpinner = false;
          $scope.highfives = highfives;
        });
      });
    }

    // $scope.show = function(){
    //   var modalView = new supersonic.ui.View("hi5#hand");
    //   var options = {
    //     animate: true
    //   }

    //   supersonic.ui.modal.show(modalView, options);
    //   setTimeout(function(){
    //     supersonic.ui.layers.pop();
    //   }, 3000);
    // }

  });
