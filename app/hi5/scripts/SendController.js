angular
  .module('hi5')
  .controller('SendController', function($scope, supersonic) {
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

			if(Math.abs(acc.z)  > 10){
				$scope.$apply($scope.highfive = "You are awesome");
		    }

		    setTimeout(function(){
                if ($scope.highfive != ""){
                    $scope.stopAccelerometer();    
                }
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
