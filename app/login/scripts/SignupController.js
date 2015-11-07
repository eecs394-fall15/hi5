var errs = {
	INVALID_USERNAME : "- Invalid username, need at least 4 characters",
	INVALID_PASSWORD : "- Invalid password, must use number and needs to be 6 characters long",
	NONMATCHING_PASSWORD : "- Passwords don't match",
	USERNAME_TAKEN : "- Sorry, but that username is taken"
};

angular
.module('login')
.controller('SignupController', function($scope, supersonic, User){	
	
	$scope.user = {
		username : "",
		password : "",
		password2 : "",
	};

	$scope.optional = false;

    $scope.submitForm = function () {
    	var errors = validateUser($scope.user);

    	if  (errors.length > 0){
    		var options = {
    			message : errors.join('\n'),
    			buttonLabel : 'Close'
    		};
    	

    		supersonic.ui.dialog.alert('Signup Issues', options);
    	} else {
	    	if (!$scope.optional){
	    		$scope.optional = true;
	    	} else {
				$scope.showSpinner = true;
				var newuser = new User($scope.user)

				newuser.save().then( function () {
					supersonic.ui.dialog.alert('Registered! Sign in to Hi5!').then(function(){
                        supersonic.ui.layers.pop();
                    });
				});
			}
		}
    };

    function validateUser(user){
    	var errors = [];
    	console.log("testing user");
    	if (!validatePassword(user.password)){
    		errors.push(errs.INVALID_PASSWORD);
    	}
    	else {
	    	if(user.password !== user.password2){
	    		errors.push(errs.NONMATCHING_PASSWORD);
	    	}
	    }

    	if(!validateUsername(user.username)){
    		errors.push(errs.INVALID_USERNAME);
    	} else{
    		if(!checkUsernameUnique(user.username)){
    			errors.push(errs.USERNAME_TAKEN);
    		}
    	}

    	return errors;
    }

    function validatePassword(pass){
    	return (pass.length >= 6) && (pass.search(/\d/) !== -1);
    }

    function validateUsername(username){
    	return username.length >= 4 
    }

    function checkUsernameUnique(username){
    	return true;
    }
});