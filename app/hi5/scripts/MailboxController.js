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
      initWatching(highfive.sender);
    };

    var initWatching = function(recipient){
        $scope.watching = true;

        Accelerometer.start(function(motion){
          if (motion === null){
            $scope.watching = false;
            supersonic.ui.dialog.alert("No highfive detected");
          } else {

            $scope.watching = false;

            supersonic.ui.dialog.alert("Sending " + motion);

            Requests.sendHighfive(recipient, null, null);
          }
        }, 2000);
    };


    $scope.stopHiFive = function () {
      $scope.watching = false;
      Accelerometer.stop(function(){
        supersonic.ui.dialog.alert("Highfive stopped");
      });
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


    supersonic.ui.views.current.whenVisible( function() {
      if (first) {
        $scope.loadHighfives();
        first = false;
      }
    });

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

    // function sortHighfives(highfives){
    //   var sent_opened = [];
    //   var received_opened = [];
    //   var sent_unopened = [];
    //   var received_unopened = [];

    //   highfives.forEach(function(highfive){
    //     if (highfive.sender == Requests.currentUser.id){
    //       highfive.opened ? sent_opened.push(highfive) : sent_unopened.push(highfive)
    //     } else{
    //       highfive.opened ? received_opened.push(highfive) : received_unopened.push(highfive)
    //     }
    //   });

    //   sent_opened.sort(compareHighfiveDates);
    //   received_opened.sort(compareHighfiveDates);
    //   sent_unopened.sort(compareHighfiveDates);
    //   received_unopened.sort(compareHighfiveDates);

    //   var ret = received_unopened.concat(received_opened, sent_unopened, sent_opened);

    //   return ret;

    //   function compareHighfiveDates(a, b){
    //     if(a.createdAt > b.createdAt){
    //       return 1;
    //     }

    //     if(a.createdAt < b.createdAt){
    //       return -1;
    //     }

    //     return 0;
    //   }
    // }

    newBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.loadHighfives,
      styleId: "nav-refresh"
    });

    supersonic.ui.navigationBar.update({
      title: "Inbox",
      overrideBackButton: false,
      buttons: {
        right: [newBtn]
      }
    }).then(supersonic.ui.navigationBar.show());

    supersonic.ui.views.current.whenVisible( function() {
      $scope.loadHighfives();
    });

});
