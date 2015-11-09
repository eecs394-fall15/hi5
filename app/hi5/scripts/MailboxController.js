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
    };

    $scope.show = function(highfive){
      var modalView = new supersonic.ui.View("hi5#view");
      var options = {
        animate: false
      };

      supersonic.ui.modal.show(modalView, options).then(function(){
        setTimeout(function(){
          $scope.$apply(function() {
            highfive.opened = true;
            highfive.save().then(function(){});
          });
          supersonic.ui.modal.hide(options);
        }, 4000);
      });
    };

    supersonic.ui.views.current.whenVisible( function() {
      $scope.loadHighfives();
    });

  });
