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
    };

    $scope.rejectFriendRequest = function(request){
      Requests.rejectFriendRequest(request, function(request){
        if (!error){
            $scope.$apply(function(){
              $scope.showSpinner = true;
              $scope.request = request;
            });
          }
        });
    };



    $scope.loadFriendRequests();
  });
