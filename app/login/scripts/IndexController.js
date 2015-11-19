angular
  .module('login')
  .controller('IndexController', function($scope, UserParse, supersonic) {
    $scope.error = null;

    /**
    * Responds to the login button press
    */
    $scope.handleLogin = function() {
      parseLogin($scope.username, $scope.password, leaveLogin, errorHandler);
    };


    //TODO: try making it so it happens when the view is loaded, before displayed
    /**
    * When screen becomes visible, trys cached login
    */
    supersonic.ui.views.current.whenVisible(function() {
      tryCachedLogin();
    });

    /**
    * Attempts login through Parse users with given credentials
    */
    function parseLogin(username, password, successCb, failCb){
      UserParse.logIn(username, password)
      .then(function(err){
        supersonic.logger.info("Login Succeed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
        successCb(user);
      }, failCb);
    }

    /**
    * Animates leaving the login screen
    */
    function leaveLogin(){
        var options = {
           duration: 0.5,
           curve: "easeInOut"
        };

        var animation = supersonic.ui.animate("slideFromLeft", options);
        supersonic.ui.initialView.dismiss(animation);
    }

    /**
    * Logs error and displays it to user
    */
    function errorHandler(error){
        //TODO: USE the Error codes to more friendly message displays for user
        $scope.error = error;
        supersonic.logger.log(error);
        supersonic.logger.info("Login Failed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
    }

    /**
    * Checks to see if there is a user logged in, leaves the 
    * login screen if a Parse user token is found
    */
    function tryCachedLogin(){
      if(UserParse.current())
        leaveLogin();
    }
  });
