angular
  .module('hi5')
  .controller('FriendRequestController', function($scope, supersonic, Requests) {
    $scope.showSpinner = true;
    $scope.friendRequests = null;

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

    $scope.loadFriendRequests = function(){
      Requests.loadFriendRequests(function(error, friendRequests){
        if (!error){
          $scope.$apply(function(){
            $scope.showSpinner = false;
            $scope.friendRequests = friendRequests;
          });
        }
      });
    };

    $scope.acceptFriendRequest = function(request){
      Requests.acceptFriendRequest(request);
      $scope.loadFriendRequests();
    };

    $scope.rejectFriendRequest = function(request){
      Requests.rejectFriendRequest(request);
      $scope.loadFriendRequests();
    };

    newBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.create,
      styleId: "nav-new"
    });

    supersonic.ui.navigationBar.update({
      title: "Buddies",
      overrideBackButton: false,
      buttons: {
        right: [newBtn]
      }
    }).then(supersonic.ui.navigationBar.show());

    supersonic.ui.views.current.whenVisible( function() {
      $scope.loadFriendRequests();
    });
  });
