angular
  .module('hi5')
  .controller('MailboxController', function($scope, supersonic, HighfiveParse, Highfive, Parse, UserParse, Accelerometer) {
    $scope.showSpinner = true;
    $scope.highfives = null;

    $scope.load = function() {
      var query = new Parse.Query(HighfiveParse);
      query.equalTo("opened", false);
      query.equalTo("receiver", UserParse.current().id)
      query.find().then(function(highfives) {
          supersonic.logger.info("Successfully retrieved " + highfives.length + " highfives.");
          $scope.$apply( function () {
            $scope.highfives = highfives;
            $scope.showSpinner = false;
          });
        },function(error) {
          supersonic.logger.info("Error: " + error.code + " " + error.message);
        });

      // var unsubscribe = Task.all(queryParameters, options).whenChanged( function(updatedTasks) {
      //   supersonic.logger.log("First element of updated Task collection: ", updatedTasks[0]);
      // });
      // unsubscribe();
    };

    $scope.load();
  });
