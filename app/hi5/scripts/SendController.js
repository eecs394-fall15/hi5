angular
  .module('hi5')
  .controller('SendController', function($scope, supersonic, Requests, Accelerometer) {
    $scope.users = [];

    loadFriends();

    $scope.addFriend = function(){
      var options = {
        title: "Send Friend Request",
        defaultText : ""
      };

      supersonic.ui.dialog.prompt("Enter friend's username", options)
      .then(function(promptdata) {
        var username = promptdata.input;

        Requests.sendFriendRequest(username, function(error){
          if(error){
            supersonic.ui.dialog.alert("Could not find user");
          } else {
            supersonic.ui.dialog.alert("Request sent!");
          }
        });
      });
    };

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

    $scope.testFunc = function(){
      Requests.loadFriends();
    };

    $scope.initWatching = function(){
        $scope.watching = true;
        Accelerometer.start(function(motion){
          if (motion === null){
            supersonic.ui.dialog.alert("No highfive detected");
          } else {
            var recipients = getSelectedUsers();
            $scope.watching = false;

            supersonic.ui.dialog.alert("Sending " + motion);

            for(var i =0; i < recipients.length; ++i){
              Requests.sendHighfive(recipients[i], null, null);
            }

            $scope.clearUsers();
          }
        });
  	};

    function getSelectedUsers(){
      return $scope.users.filter(function(user){
        return user.selected;
      });
    }

    function enableButtons (){
      return getSelectedUsers().length > 0;
    }

    function loadFriends(){
      Requests.loadUsers(function(error, users) {
        $scope.$apply( function () {
          $scope.users = users.map(function(user){
            user.selected=false;
            return user;
          });
        });
      });
    }

});
