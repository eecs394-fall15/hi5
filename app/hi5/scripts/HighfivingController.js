angular
.module('hi5')
.controller('HighfivingController', function(supersonic, Requests, Accelerometer) {
	$scope.watching = true;
	var watchingFunction = function(){

	}

	$scope.initWatching = function(){
		Accelerometer.start(function(motion){
          if (motion === null){
            $scope.watching = false;
            supersonic.ui.dialog.alert("No highfive detected");
          } else {
            var recipients = getSelectedUsers();
            $scope.watching = false;

            supersonic.ui.dialog.alert("Sending " + motion);

            for(var i =0; i < recipients.length; ++i){
              Requests.sendHighfive(recipients[i], null, null);
            }

            $scope.clearUsers();
          }
        }, 2000);
	}

	$scope.stopHiFive = function () {
      $scope.watching = false;
      Accelerometer.stop(function(){
        supersonic.ui.dialog.alert("Highfive stopped");
      });
    }
});