angular
  .module('login')
<<<<<<< HEAD
  .controller('IndexController', function($scope, supersonic) {
  	$scope.login = function () {
		var options = {
		   duration: .5,
		   curve: "easeInOut"
		}

		var animation = supersonic.ui.animate("slideFromRight",options);
		supersonic.ui.initialView.dismiss(animation);
	}

=======
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
        supersonic.logger.info("Login Failed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
      });
    };
>>>>>>> 55211edb81db618b2c243de4a24808544cf595a1
  });
