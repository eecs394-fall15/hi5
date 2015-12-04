angular
  .module('hi5')
  .controller('MailboxController', function($scope, supersonic, HighfiveData, Requests, Utility, Accelerometer, $interval) {
    $scope.showSpinner = true;
    $scope.highfives = null;
    var first = true;

    // var iconClasses = {
    //   UNOPENED_RECEIVED : "super-ios-circle-filled",
    //   OPENED_RECEIVED : "super-ios-circle-outline",
    //   UNOPENED_SENT : "super-ios-paperplane-outline",
    //   OPENED_SENT : "super-ios-paperplane"
    // };

    var iconClasses = {
      // UNOPENED_RECEIVED : "super-ios-paw",
      UNOPENED_RECEIVED : "super-android-hand",
      // OPENED_RECEIVED : "super-ios-paw-outline",
      OPENED_RECEIVED : "super-ios-circle-outline",
      UNOPENED_SENT : "super-ios-paperplane-outline",
      OPENED_SENT : "super-ios-paperplane"
    };
    

    $scope.reply = function(highfive) {
      supersonic.logger.log('SWIPED');
      supersonic.data.channel('recipients').publish(highfive.sender);
      $scope.startHighfiving();
    };



    $scope.startHighfiving = function () {
      var view = new supersonic.ui.View("hi5#highfiving");
      var customAnimation = supersonic.ui.animate("flipVerticalFromTop");

      supersonic.ui.modal.show(view, {animation: customAnimation});
    };


    
    $scope.loadHighfives = function(){
      $scope.longPull = $interval(function(){
        supersonic.logger.log("Requesting highfives");
        Requests.loadHighfives(function(highfives){
          $scope.$apply(function(){
            $scope.showSpinner = false;
            $scope.highfives = highfives;
          });
        });
      }, 5000);
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
      Requests.viewHighfive(highfive, function(highfive){
        var viewURL = 'hi5#view'
        var view = new supersonic.ui.View(viewURL);
        var typeData = JSON.parse(highfive.type);
        var type = typeData.type;
        var subtype =  typeData.subtype;

        var options = {
          params: {
            id: highfive.id,
            type : type,
            subType: subtype
          }
        };

        supersonic.logger.log(type);
        supersonic.logger.log(subtype);

        var subtypeData = HighfiveData[type].subtypes.filter(function(val){
            return val['id'] === subtype;
        });

        // supersonic.logger.log(JSON.stringify(subtypeData));

        var delay = subtypeData[0].length;

        supersonic.ui.layers.push(view, options).then(function(){
          setTimeout(function(){
            var nullAnimation = supersonic.ui.animate("fade", {duration: '0.0'});
            var options = {
              animation: nullAnimation
            }
            supersonic.ui.layers.pop();
          }, delay);
        });
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
    supersonic.ui.views.current.whenHidden( function() {
      $interval.cancel($scope.longPull);
      $scope.longPull = undefined;
      supersonic.logger.log("This view is now hidden");
    });

});
