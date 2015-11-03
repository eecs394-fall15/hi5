angular
  .module('hi5')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
    $scope.numTimers = 0;
    $scope.watchID = null;
    $scope.timers = {
    	giving : false 
    };

    

    $scope.initWatching = function(){
    	supersonic.logger.debug('Calling watch');

		window.ondevicemotion = function(motionEvent){
			var acc = motionEvent.acceleration;

			supersonic.logger.debug(acc.z);

			if(Math.abs(acc.z)  > 7){
				$scope.$apply($scope.highfive = "You are awesome");
		    }

		    setTimeout(function(){
		    	$scope.stopAccelerometer();
		    	// cb();
		    }, 10000);

		    $scope.timers.giving = true;

		    $scope.numTimers++;
	    };
    }


    $scope.stopAccelerometer = function(timer){
    	supersonic.logger.debug('Calling stop');
    	$scope.highfive = "";
    	window.ondevicemotion = null;
		$scope.timers[timer] = false;
    };
  });
