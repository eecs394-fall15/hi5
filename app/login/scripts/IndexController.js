angular
  .module('login')
  .controller('IndexController', function($scope, UserParse, supersonic) {
    $scope.error = null;

    $scope.handleLogin = function() {
      supersonic.logger.info("User: " + $scope.username);
      supersonic.logger.info("Pass: " + $scope.password);
      parseLogin($scope.username, $scope.password, leaveLogin, errorHandler);
    };

    supersonic.ui.views.current.whenVisible(function() {
      tryCachedLogin();
    });

    function parseLogin(username, password, successCb, failCb){
      UserParse.logIn(username, password)
      .then(function(user){
        supersonic.logger.info("Login Succeed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
        successCb(user);
      }, failCb);
    }

    function leaveLogin(user){
        var options = {
           duration: 0.5,
           curve: "easeInOut"
        };

        var animation = supersonic.ui.animate("slideFromLeft",options);
        supersonic.ui.initialView.dismiss(animation);
    }

    function errorHandler(error){
        $scope.error = error;
        supersonic.logger.log(error);
        supersonic.logger.info("Login Failed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
    }


    function tryCachedLogin(){
      if(UserParse.current())
        leaveLogin(null);
    }
  });
