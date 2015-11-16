angular
  .module('hi5')
  .controller('FriendRequestController', function($scope, supersonic, Requests) {
    $scope.showSpinner = true;
    $scope.friendRequests = null;

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


    supersonic.ui.views.current.whenVisible( function() {
      $scope.loadFriendRequests();
    });
  });
