angular
  .module('hi5')
  .controller('MailboxController', function($scope, supersonic, HighfiveParse, Highfive, Parse, UserParse) {
    $scope.showSpinner = true;
    $scope.highfives = null;

    $scope.view = function() {
      var view = new supersonic.ui.View("hi5#view");
      supersonic.ui.layers.push(view)
    };

    $scope.load = function() {
      var query = new Parse.Query(HighfiveParse);
      query.equalTo("opened", false);
      query.equalTo("receiver", UserParse.current().id);
      query.find().then(function(highfives) {
          supersonic.logger.info("Successfully retrieved " + highfives.length + " highfives.");
          $scope.$apply( function () {
            $scope.highfives = highfives;
            $scope.showSpinner = false;
          });
        },function(error) {
          supersonic.logger.info("Error: " + error.code + " " + error.message);
        });
    };

    $scope.load();
  });
