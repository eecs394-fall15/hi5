angular
  .module('login')
  .controller('IndexController', function($scope, UserParse, supersonic) {
    $scope.error = null;

    $scope.login = function() {
      supersonic.logger.info("User: " + $scope.username);
      supersonic.logger.info("Pass: " + $scope.password);

      UserParse.logIn($scope.username, $scope.password).then(function(user) {
        supersonic.logger.info("Login Succeed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
        var options = {
           duration: 0.5,
           curve: "easeInOut"
        };

        var animation = supersonic.ui.animate("slideFromLeft",options);
        supersonic.ui.initialView.dismiss(animation);

      }, function(error) {
        $scope.error = error;
        supersonic.logger.log(error);
        supersonic.logger.info("Login Failed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
      });
    };
  });
