angular
.module('hi5')
.controller('HighfivingController', function($scope, supersonic, HighfiveData, Accelerometer) {
    //data to return
    $scope.selectedType = null;
    $scope.selectedSubtype = null;

    //used for UI
    $scope.state = '';
    $scope.showSpinner = false;
    $scope.retry = false;

    //data for displaying
    $scope.highfiveTypes = HighfiveData;

    $scope.chooseHighfiveTypeUI = function(){
      $scope.state = 'choosingType';
      $scope.prompt = "Choose Hi5 Type"

      $scope.showSpinner = false;
    };

    $scope.chooseHighfiveSubtypeUI = function(){
      $scope.state = 'choosingSubtype';
      $scope.showSpinner = false;
      $scope.retry = false;
      $scope.prompt = "Choose Hi5"
    };

    $scope.startSimulation = function(){
      $scope.simulating = true;
      $scope.initWatching();
    };

    $scope.selectHighfiveType = function (highfiveType) {
      supersonic.logger.log("Selected : " + highfiveType);
      $scope.selectedType = highfiveType;
      $scope.chooseHighfiveSubtypeUI();
    };

    $scope.selectHighfiveSubtype = function (highfiveSubtype) {
      //TODO: enter code for return highfive type selected
      supersonic.logger.log("Selected : " + highfiveSubtype.id);
      $scope.selectedSubtype = highfiveSubtype.id;
      supersonic.data.channel('highfiving').publish(JSON.stringify({
        type: $scope.selectedType,
        subtype : $scope.selectedSubtype
      }));
      
      supersonic.ui.layers.pop();
    };

    $scope.initWatching = function(){
        supersonic.logger.log("init watching");
        $scope.state = "watching";
        $scope.prompt = "Start Hi5'ing";

        $scope.retry = false;
        $scope.showSpinner = true;

        Accelerometer.start(function(err, motion){
          supersonic.logger.log("Deleting acc data: " + Accelerometer.clearData());
          $scope.showSpinner = false;

          if(err){
            $scope.prompt = "Woops, that was a little wild! Try again!"
          } else {
            if (motion === null){
              if($scope.state === 'watching'){
                $scope.$apply(function(){
                  $scope.prompt = "You forgot to Hi5";
                  $scope.retry = true;
                });
              }
            } else {
              $scope.$apply(function(){
                $scope.selectHighfiveType(motion);
              });
            }
          }
        }, 2000);
  	};


    $scope.stopHiFive = function () {
      $scope.watching = false;
      Accelerometer.stop(function(){
        Accelerometer.clearData();
      });
    }

    supersonic.ui.views.current.whenVisible( function() {
      $scope.$apply(function(){
        $scope.initWatching();
      });
    });
});
