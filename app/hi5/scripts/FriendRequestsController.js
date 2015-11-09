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
    }





    // $scope.show = function(){
    //   var modalView = new supersonic.ui.View("hi5#hand");
    //   var options = {
    //     animate: true
    //   }

    //   supersonic.ui.modal.show(modalView, options);
    //   setTimeout(function(){
    //     supersonic.ui.layers.pop();
    //   }, 3000);
    // }

    $scope.loadFriendRequests();
  });
