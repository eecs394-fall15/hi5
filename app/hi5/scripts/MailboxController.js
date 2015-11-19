angular
  .module('hi5')
  .controller('MailboxController', function($scope, supersonic, Requests, Utility) {
    $scope.showSpinner = true;
    $scope.highfives = null;

    var first = true;
    var iconClasses = {
      UNOPENED_RECEIVED : "super-ios-circle-filled",
      OPENED_RECEIVED : "super-ios-circle-outline",
      UNOPENED_SENT : "super-ios-paperplane-outline",
      OPENED_SENT : "super-ios-paperplane"
    };


    $scope.loadHighfives = function(){
      supersonic.logger.log("Requesting highfives");
      Requests.loadHighfives(function(highfives){
        $scope.$apply(function(){
          $scope.showSpinner = false;
          $scope.highfives = Utility.sortHighfives(highfives);
        });
      });
    };

    $scope.clickHighfiveItem = function(highfive){
      var isOpened = highfive.opened;
      var isSender = (Requests.currentUser.id == highfive.sender);

      if (isOpened || isSender)
        return;

      showHighfive(highfive);
    };

    $scope.replyToHighfive = function(highfive){
      
    }

    $scope.highfiveTimeSince = function(highfive){
      return Utility.timeSince(highfive.createdAt);
    };

    $scope.getIconClass = function(highfive){
      return Utility.getMailboxIconClass(highfive);
    };


    supersonic.ui.views.current.whenVisible( function() {
        $scope.loadHighfives();
    });


    $scope.updateHighfives = function(highfives){
        $scope.highfives = Utility.sortHighfives(highfives);
    }

    function showHighfive(highfive){
      var modalView = new supersonic.ui.View("hi5#view");
      var options = {
        animate: false
      };

      supersonic.ui.modal.show(modalView, options).then(function(){
        setTimeout(function(){
          Requests.viewHighfive(highfive, function(){
            $scope.$apply(function() {
              highfive.opened = true;
            });
          });
          
          supersonic.ui.modal.hide(options);
        }, 4000);
      });
    }

    
});
