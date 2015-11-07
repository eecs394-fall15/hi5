angular
  .module('user')
  .controller("IndexController", function ($scope, User, supersonic, UserParse, Parse) {
    $scope.users = null;
    $scope.showSpinner = true;

    // User.all().whenChanged( function (users) {
    //     $scope.$apply( function () {
    //       $scope.users = users;
    //       $scope.showSpinner = false;
    //     });
    // });
    $scope.load = function() {
      var query = new Parse.Query(UserParse);
      query.find().then(function(users) {
          supersonic.logger.info("Successfully retrieved " + users.length + " users.");
          $scope.$apply( function () {
            $scope.users = users;
            $scope.showSpinner = false;
          });
        },function(error) {
          supersonic.logger.info("Error: " + error.code + " " + error.message);
        });
    };

    $scope.load();

  });
