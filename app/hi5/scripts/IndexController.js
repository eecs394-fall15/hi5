angular
  .module('hi5')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here

    $scope.watchID = null;

    

    $scope.initWatching = function(){
    	supersonic.logger.debug('Calling watch');

		window.ondevicemotion = function(motionEvent){
			var acc = motionEvent.acceleration;

			if(Math.abs(acc.z)  > 4){
		    	supersonic.logger.debug("Interval: " + motionEvent.interval + " Z-Accleration: " + acc.z + " Gravity Z-Accleration: " + accIncludingGravity.z);
		    }
	    };
    }


    $scope.stopAccelerometer = function(){
    	supersonic.logger.debug('Calling stop');

    	if($scope.watchID){
    		// supersonic.device.accelerometer.clearWatch($scope.watchID);
    		$scope.watchID = null;
    	}
    };
  });
