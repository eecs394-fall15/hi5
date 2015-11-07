angular
  .module('hi5')
  .controller('SendController', function($scope, supersonic, User, UserParse, Parse) {
    $scope.numTimers = 0;
    $scope.watchID = null;
    $scope.timers = {
    	giving : false 
    };
    $scope.users = null;
    $scope.buttonActive = 0;

    var query = new Parse.Query(UserParse);
    query.find().then(function(users) {
        supersonic.logger.info("Successfully retrieved " + users.length + " users.");
        $scope.$apply( function () {
            $scope.users = users.map(function(user){user.selected=false; return user;});
        });
    },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
    });

    $scope.select = function (user) {
        if (user.selected) {
            $scope.buttonActive += 1;
        } else {
            $scope.buttonActive -= 1;
        }
        $scope.$apply($scope.buttonActive);
    }

    $scope.initWatching = function(){
        $scope.watching = true;
    	supersonic.logger.info('Calling watch');
		window.ondevicemotion = function(motionEvent){
			var acc = motionEvent.acceleration;
			supersonic.logger.info(acc.z);
		    setTimeout(function(){
                if(Math.abs(acc.z)  > 10){
                    $scope.$apply(function(){
                        $scope.watching = false;
                        $scope.highfive = "You are awesome";
                    });
                }
		    }, 2000);

		    $scope.timers.giving = true;

		    $scope.numTimers++;
	    };
    }

    $scope.stopAccelerometer = function(timer){
    	supersonic.logger.info('Calling stop');
    	window.ondevicemotion = null;
		// $scope.timers[timer] = false;
    };

    $scope.clear = function () {
        $scope.highfive = null;
        $scope.stopAccelerometer();
    }
  });
