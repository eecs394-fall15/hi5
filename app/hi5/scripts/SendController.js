angular
  .module('hi5')
  .controller('SendController', function($scope, supersonic, Requests, Accelerometer) {
    $scope.users = [];
    $scope.showSpinner = true;

    var unsubscribe = supersonic.data.channel('highfiving').subscribe(function(message, reply) {
        supersonic.logger.log(message);
        var chosenHighfive = JSON.parse(message);

        if(!chosenHighfive.type || !chosenHighfive.subtype){
          supersonic.ui.dialog.alert("Sorry, there was an issue sending your highfive");
        } else{
          console.log("sending");
          sendHighfives(chosenHighfive);
        }
    });

    supersonic.ui.views.current.whenVisible( function() {
      loadFriends();
    });

    $scope.clearUsers = function(){
      $scope.users = $scope.users.map(function(user){
        user.selected = false;
        return user;
      });

      $scope.enableButtons = enableButtons();
    }

    $scope.select = function (user) {
        $scope.enableButtons = enableButtons();
    };

    $scope.initWatching = function(){
        $scope.watching = true;

        Accelerometer.start(function(err, motion){
          supersonic.logger.log("Deleting acc data: " + Accelerometer.clearData());
          if(err){
            supersonic.ui.dialog.alert("Woops, that was a little wild! Try again!")
            $scope.initWatching();
          } else {
            if (motion === null){
              $scope.watching = false;
              supersonic.ui.dialog.alert("No highfive detected");
            } else {
              var recipients = getSelectedUsers();

              supersonic.ui.dialog.alert("Sending " + motion)
              .then(function(){
                for(var i =0; i < recipients.length; ++i){
                  Requests.sendHighfive(recipients[i], null, null);
                }

                $scope.$apply(function(){
                  $scope.watching = false;
                  $scope.clearUsers();
                });
              });        
            }
          }
        }, 2000);
  	};

    $scope.startHighfiving = function(){
      var view = new supersonic.ui.View("hi5#highfiving");
      var customAnimation = supersonic.ui.animate("flipVerticalFromTop");

      supersonic.ui.layers.push(view, {animation: customAnimation});
    };

    $scope.stopHiFive = function () {
      $scope.watching = false;
      Accelerometer.stop(function(){
        Accelerometer.clearData();
        // supersonic.ui.dialog.alert("Highfive stopped");
      });
    }

    function getSelectedUsers(){
      var ret = $scope.users.filter(function(user){
        return user.selected;
      });

      return ret.map(function(user){
        return user.id;
      });
    }

    function enableButtons (){
      return getSelectedUsers().length > 0;
    }

    function loadFriends(){
      Requests.loadFriends(function(users) {
        $scope.$apply( function () {
          $scope.users = users.map(function(user){
            user.selected=false;
            return user;
          });
          $scope.showSpinner = false;
        });
      });
    }

    function sendHighfives(highfive){
      var recipients = getSelectedUsers();
     
      supersonic.ui.dialog.alert("Sending")
      .then(function(){
        for(var i =0; i < recipients.length; ++i){
          Requests.sendHighfive(recipients[i], null, null);
        }

        $scope.$apply(function(){
          $scope.watching = false;
          $scope.clearUsers();
        });
      });  
    }
});
