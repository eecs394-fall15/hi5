angular
  .module('hi5')
  .controller('ContactListController', function($scope, supersonic, Requests) {
    $scope.contacts = [];
    var numberPattern = /\d+/g;

    $scope.leaveList = function(){
    	supersonic.ui.layers.pop();
    };

    $scope.addFriendUsername = function(username){
      if(username.length === 0)
        return;

      Requests.sendFriendRequest(username, function(error){
        if(error){
          supersonic.ui.dialog.alert("Could not find user");
        } else {
          supersonic.ui.dialog.alert("Request sent!");
        }
      }, false);
    };

	$scope.fullname = function(contact){
		var first = contact.givenName || "";
		var last = contact.familyName || "";

		return first + " " + last;
	}

	$scope.phoneNumber = function(contact){
		if(!contact.phoneNumbers || contact.phoneNumbers.length === 0)
			return ""

		return contact.phoneNumbers[0].value;
	}

	$scope.handleClick = function(){
		supersonic.logger.log("Tapped");
	}

	$scope.addFriend = function(contact){
		if(!contact.phoneNumbers || contact.phoneNumbers.length === 0)
            supersonic.ui.dialog.alert("No phone number provided");

    supersonic.logger.log("Attempting friend request");
		var telephone = contact.phoneNumbers[0].value.match(numberPattern).join("");
		supersonic.logger.log(telephone);

		Requests.sendFriendRequest(telephone, function(error){
          if(error){
            supersonic.ui.dialog.alert("Could not find user");
          } else {
            supersonic.ui.dialog.alert("Request sent!");
          }
        }, true);
	}

	// supersonic.ui.views.current.whenVisible(function(){
	// 	loadContacts();
	// });


	function loadContacts(){
		// var options = new ContactFindOptions();
		// options.multiple = true;
		// var fields = ["displayName", "name", "nickname "];
		// navigator.contacts.find(fields, onSuccess, onError, options);

		// function onSuccess(contacts) {
  // 			supersonic.logger.log( JSON.stringify(contacts[0]) );
  // 			$scope.$apply(function(){
  // 				$scope.contacts = contacts;
  // 			});
		// }
		// function onError(err){
		// 	supersonic.logger.log(JSON.stringify(err));
		// }
		navigator.contacts.pickContact( function(contact) {
				// if(contact.name) { // If user did not press cancel
				// 	var name = contact.name.formatted;
				// 	var email = contact.emails? contact.emails[0].value : "";
				// 	var phone = contact.phoneNumbers? contact.phoneNumbers[0].value.replace(/[ \(\)-]/g, "") : "";

				// 	document.getElementById("name").value = name;
				// 	document.getElementById("email").value = email;
				// 	document.getElementById("phone").value = phone;
				// 	document.getElementById("interval").value = "1";
				// }
		}, function(err) {
			alert('Error at AddController.js: ' + err);
		});
	}

	$scope.removeEmptyContacts = function(contact) {
		return (contact.name.formatted.length > 0);
	}


  });
