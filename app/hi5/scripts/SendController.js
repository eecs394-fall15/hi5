angular
  .module('hi5')
  .controller('SendController', function($scope, supersonic, Requests, Accelerometer, User, UserParse, Parse, Highfive) {
    $scope.users = [];
    loadFriends();

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
    	 
        Accelerometer.start(function(motion){
          if (motion === null){
            supersonic.ui.dialog.alert("No hifive detected");
          } else {
            var recipients = getSelectedUsers();
            $scope.watching = false;

            supersonic.ui.dialog.alert("Sending " + motion);

            for(var i =0; i < recipients.length; ++i){
              Requests.sendHighfive(recipients[i], null, null);
            }
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
      Requests.loadFriends(function(error, users) {
        $scope.$apply( function () {
          $scope.users = users.map(function(user){
            user.selected=false;
            return user;
          });
        });
      });
    }

});
