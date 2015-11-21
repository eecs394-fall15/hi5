angular
  .module('hi5')
  .controller('FriendRequestController', function($scope, supersonic, Requests) {
    $scope.showSpinner = true;
    $scope.friendRequests = null;

    var contactListView = new supersonic.ui.View({
      location: "hi5#ContactList",
      id: 'contactList'
    });



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
      supersonic.ui.dialog.alert("Friend Request Accepted");
    };

    $scope.rejectFriendRequest = function(request){
      Requests.rejectFriendRequest(request);
      $scope.loadFriendRequests();
    };

    supersonic.ui.views.current.whenVisible( function() {
      $scope.loadFriendRequests();
    });



    // MENU BAR FUNCTIONS

    function goToContactList(){
      supersonic.ui.modal.show(contactListView);
    }

    newBtn = new supersonic.ui.NavigationBarButton({
      onTap: goToContactList,
      styleId: "nav-new"
    });

    supersonic.ui.navigationBar.update({
      title: "Buddies",
      overrideBackButton: false,
      buttons: {
        right: [newBtn]
      }
    }).then(supersonic.ui.navigationBar.show());


  });
