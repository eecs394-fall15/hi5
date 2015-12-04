angular
  .module('hi5')
  .controller('SendController', function($scope, supersonic, Requests, Accelerometer) {
    $scope.users = [];
    $scope.showSpinner = true;
    var selectedRecipients = null;
    var firstLoad = true;
    $scope.help = false;

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

    var recipientSub = supersonic.data.channel('recipients').subscribe(function(message, reply){
      supersonic.logger.log(message);
      selectedRecipients = [message];
    });

    supersonic.ui.views.current.whenVisible( function() {
      if (firstLoad){
        loadFriends();
        // firstLoad = false;
      }
      //TODO: Check cache for if first login
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


    $scope.startHighfiving = function(){
      var view = new supersonic.ui.View("hi5#highfiving");
      var customAnimation = supersonic.ui.animate("flipVerticalFromTop");

      selectedRecipients = getSelectedUsers();
      supersonic.ui.modal.show(view, {animation: customAnimation});
    };

    $scope.toggleHelp = function(){
      supersonic.logger.log("Toggling help");
        $scope.help = !$scope.help;
    }

    helpBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.toggleHelp,
      styleId: "nav-help"
    });

    supersonic.ui.navigationBar.update({
      title: "Send Hi5's",
      overrideBackButton: false,
      buttons: {
        right: [helpBtn]
      }
    }).then(supersonic.ui.navigationBar.show());


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
          $scope.users = users;
          $scope.showSpinner = false;
          $scope.enableButtons = enableButtons();
        });
      });
    }

    function sendHighfives(highfive){
      var highfiveType_str = JSON.stringify(highfive);

      supersonic.ui.dialog.alert("Sent")
      .then(function(){
        for(var i =0; i < selectedRecipients.length; ++i){
          Requests.sendHighfive(selectedRecipients[i], highfiveType_str, null);
        }

        $scope.$apply(function(){
          $scope.watching = false;
          $scope.clearUsers();
        });
      });
    }
});
