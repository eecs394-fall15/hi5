angular
  .module('hi5')
  .controller('FriendRequestController', function($scope, supersonic, Requests) {
    $scope.showSpinner = true;
    $scope.friendRequests = null;
    $scope.statuses = [];

    $scope.curUser = Requests.currentUser;

    supersonic.ui.views.current.whenVisible(function() {
      loadFriends();
    });


    var contactListView = new supersonic.ui.View({
      location: "hi5#ContactList",
      id: 'contactList'
    });


    $scope.getStatus = function(user){
      var status = user.get('status');
      return status ? status : "No status currently";
    }

    $scope.handlePersonalStatus = function(){
      displayStatusPrompt(setStatus);
    };

    $scope.replyFive = function(status){
      supersonic.logger.log("replying to status");
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

    supersonic.ui.views.current.whenVisible( function() {
      $scope.loadFriendRequests();
    });

    function setStatus(promptdata){
      var status = promptdata.input.trim();
      
      if(status.length > 40){
        supersonic.ui.dialog.alert("Status too long")
        displayStatusPrompt(setStatus);
        return;
      }

      Requests.setStatus(status, function(err){
        if(err)
          supersonic.logger.log("Bad status")
        else{
          supersonic.logger.log("Successful status")
          $scope.curUser = Requests.currentUser
        }
      });
    } 

    function displayStatusPrompt(successCb, defaultText){
      defaultText = defaultText || "";

      var options = {
        title: "Set new status",
        defaultText : defaultText
      };

      supersonic.ui.dialog.prompt("Set new status", options).then(successCb);
    }

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

    function loadFriends(){
      Requests.loadFriends(function(users) {
        $scope.$apply( function () {
          $scope.statuses = users.map(function(user){
            user.selected=false;
            return user;
          });
          $scope.showSpinner = false;
        });
      });
    }

  });
