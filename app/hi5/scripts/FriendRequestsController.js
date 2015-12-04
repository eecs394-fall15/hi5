angular
  .module('hi5')
  .controller('FriendRequestController', function($scope, supersonic, Requests) {
    $scope.showSpinner = true;
    $scope.friendRequests = null;
    $scope.statuses = [];

    $scope.curUser = Requests.currentUser;
    var numberPattern = /\d+/g;

    supersonic.ui.views.current.whenVisible(function() {
      loadFriends();
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
      supersonic.ui.dialog.alert("Friend Request Accepted");
    };

    $scope.rejectFriendRequest = function(request){
      Requests.rejectFriendRequest(request);
      $scope.loadFriendRequests();
    };

    $scope.addByContact = function () {
      navigator.contacts.pickContact( function(contact) {
        if(!contact.phoneNumbers || contact.phoneNumbers.length === 0)
          supersonic.ui.dialog.alert("No phone number provided");

        supersonic.logger.log("Attempting friend request");
        var telephone = contact.phoneNumbers[0].value.match(numberPattern).join("");
        supersonic.logger.log(telephone);

        Requests.sendFriendRequest(telephone, function(error){
          if(error){
            supersonic.ui.dialog.alert("Could not find user");
          } else {
            supersonic.ui.dialog.alert("Request sent!");
          }
        }, true);
      }, function(err) {
        alert('Error at AddController.js: ' + err);
      });
    }

    $scope.addByUsername = function (username) {
      if(username.length === 0)
        return;

      Requests.sendFriendRequest(username, function(error){
        if(error){
          supersonic.ui.dialog.alert("Could not find user");
        } else {
          supersonic.ui.dialog.alert("Request sent!");
        }
      }, false);
    }

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
      $scope.$apply(function(){
        $scope.contactList = true;
      });
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
          $scope.statuses = users.map(function(user){
            user.selected=false;
            return user;
          });
      });
    }

  });
