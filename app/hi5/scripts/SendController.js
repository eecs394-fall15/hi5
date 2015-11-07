angular
  .module('hi5')
  .controller('SendController', function($scope, supersonic, User, UserParse, Parse, Highfive) {
    $scope.numTimers = 0;
    $scope.watchID = null;
    $scope.timers = {
    	giving : false
    };
    $scope.users = [];
    $scope.buttonActive = 0;
    var flag = false;


    var selectedUsers = [];

    var query = new Parse.Query(UserParse);
    query.find().then(function(users) {
        supersonic.logger.info("Successfully retrieved " + users.length + " users.");
        $scope.$apply( function () {
            $scope.users = users.map(function(user){
              user.selected=false;
              return user;
            });
        });
    },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
    });

    function getSelectedUsers(){
      return $scope.users.filter(function(user){
        return user.selected;
      });
    }

    function clearUsers(){
      $scope.users = $scope.users.map(function(user){
        user.selected = false;
        return user;
      })

      $scope.enableButtons = false;
      $scope.$apply($scope.enableButtons);
    }

    function enableButtons (){
      return getSelectedUsers().length > 0;
    }

    $scope.select = function (user) {
        $scope.enableButtons = enableButtons();
        $scope.$apply($scope.enableButtons);
        var index = selectedUsers.indexOf(user);

        if(index < 0)
          selectedUsers.push(user);
        else {
          selectedUsers.slice(index);
        }
    };

    $scope.initWatching = function(){
        $scope.watching = true;
    	supersonic.logger.info('Calling watch');
		window.ondevicemotion = function(motionEvent){
			var acc = motionEvent.acceleration;
			// supersonic.logger.info(acc.z);
		    setTimeout(function(){
                if(Math.abs(acc.z)  > 10){
                  flag = true;
                }
		    }, 2000);

        if (flag){
          $scope.$apply(function(){
              var susers = getSelectedUsers();
              for (var user in selectedUsers) {
                highfive = {
                  opened: false,
                  receiver: user.id,
                  sender: UserParse.current().id,
                  senderName: UserParse.current().name,
                  type: 'highfive'
                };
                supersonic.logger.log(user.id);
                newhighfive = new Highfive(highfive);
                newhighfive.save().then(function(){
                    supersonic.logger.info("Hi5 sent!");
                });
              }
              $scope.watching = false;
              $scope.highfive = "You are awesome";
          });
        }

		    $scope.timers.giving = true;
		    $scope.numTimers++;
	    };
    };


    $scope.stopAccelerometer = function(timer){
    	supersonic.logger.info('Calling stop');
    	window.ondevicemotion = null;
		// $scope.timers[timer] = false;
    };

    $scope.clear = function () {
        $scope.highfive = null;
        $scope.stopAccelerometer();
    };
  });
