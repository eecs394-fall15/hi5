angular
  .module('hi5')
  .controller('MailboxController', function($scope, supersonic, Requests, Utility, Accelerometer) {
    $scope.showSpinner = true;
    $scope.highfives = null;
    var first = true;

    var iconClasses = {
      UNOPENED_RECEIVED : "super-ios-circle-filled",
      OPENED_RECEIVED : "super-ios-circle-outline",
      UNOPENED_SENT : "super-ios-paperplane-outline",
      OPENED_SENT : "super-ios-paperplane"
    };

    $scope.reply = function(highfive) {
      supersonic.logger.log('SWIPED');
      // initWatching(highfive.sender);
      supersonic.data.channel('recipients').publish(highfive.sender);
      $scope.startHighfiving();
    };

    

    $scope.startHighfiving = function () {
      var view = new supersonic.ui.View("hi5#highfiving");
      var customAnimation = supersonic.ui.animate("flipVerticalFromTop");

      supersonic.ui.modal.show(view, {animation: customAnimation});
    };



    $scope.loadHighfives = function(){
      supersonic.logger.log("Requesting highfives");
      Requests.loadHighfives(function(highfives){
        $scope.$apply(function(){
          $scope.showSpinner = false;
          $scope.highfives = highfives;
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



    $scope.highfiveTimeSince = function(highfive){
      return Utility.timeSince(highfive.createdAt);
    };


    $scope.getIconClass = function(highfive){
      var isOpened = highfive.opened;
      var isSender = (Requests.currentUser.id == highfive.sender);

      if(isSender){
        return 'icon ' + (isOpened ? iconClasses.OPENED_SENT : iconClasses.UNOPENED_SENT);
      }

      return 'icon ' + (isOpened ? iconClasses.OPENED_RECEIVED : iconClasses.UNOPENED_RECEIVED);
    };



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
    };



    function logout(){
      supersonic.logger.log("Logging out");
      Requests.logout().then(function(){
        supersonic.ui.initialView.show();
      })
    }

    logoutBtn = new supersonic.ui.NavigationBarButton({
      onTap: logout,
      styleId: "nav-logout"
    });

    newBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.loadHighfives,
      styleId: "nav-refresh"
    });

    supersonic.ui.navigationBar.update({
      title: "Inbox",
      overrideBackButton: false,
      buttons: {
        left :[logoutBtn],
        right: [newBtn]
      }
    }).then(supersonic.ui.navigationBar.show());

    supersonic.ui.views.current.whenVisible( function() {
      $scope.loadHighfives();
    });

});
