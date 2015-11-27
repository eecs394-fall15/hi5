angular
.module('common')
.factory('Requests', function(supersonic, User, UserParse, Highfive, HighfiveParse, Parse, FriendRequest, FriendRequestParse){
	var service = {};
	var curUserFriends = null;

	service.currentUser = UserParse.current();


	service.logout = function(successCb, failureCb){
		return UserParse.logOut();
	}

/************* HANDLE Status *********************/

	service.setStatus = function(newStatus, cb){
		if(typeof newStatus !== 'string' || newStatus.trim() ===0){
			supersonic.ui.dialog.alert("Please enter a status");
		} else {
			UserParse.current().set('status', newStatus);
			UserParse.current().save()
			.then(function(){
				cb(null);
			},
				function(err){
					cb(err);
			})
		}
	}

	



/************* HANDLE HIGHFIVES *********************/

	service.loadHighfives = function(cb){
		supersonic.logger.log("Loading highfives");
		var unopenedReceivedQuery = new Parse.Query(HighfiveParse);
      	unopenedReceivedQuery.equalTo("opened", false);
      	unopenedReceivedQuery.equalTo("receiver", UserParse.current().id);

      	var openedReceivedQuery = new Parse.Query(HighfiveParse);
      	openedReceivedQuery.equalTo("opened", true);
      	openedReceivedQuery.equalTo("receiver", UserParse.current().id);
      	// openedReceivedQuery.limit(5).descending("createdAt");

      	var sentQuery = new Parse.Query(HighfiveParse);
      	sentQuery.equalTo("opened", false);
      	sentQuery.equalTo("sender", UserParse.current().id);

      	var combinedQuery = Parse.Query.or(unopenedReceivedQuery, openedReceivedQuery);

      	combinedQuery.find()
      	.then(function(highfives) {
      		supersonic.logger.log("Succesfully retrieved highfives: " + highfives.length);
			cb(highfives);

        },function(error) {
          	supersonic.logger.info("Error: " + error.code + " " + error.message);
        });
	};


	/**
	*	Send highfive to receiver
	*/
	service.sendHighfive = function(receiverId, hifiveType, cb){
		var highfive = {
          opened: false,
          receiver: receiverId,
          sender: UserParse.current().id,
          senderName: UserParse.current().get('username'),
          type: hifiveType
        };

        var newhighfive = new Highfive(highfive);

        newhighfive.save().then(function(){
            supersonic.logger.info("Hi5 sent!");
        });
	};


	/**
	*	Set the highfive to viewed and save it
	*/
	service.viewHighfive = function(highfive, cb){
		highfive.opened = true;
        highfive.save().then(function(error){
        	cb(highfive)
        });
	};


/************* HANDLE FRIEND REQUESTS *********************/


	service.sendFriendRequest = function(searchParam, cb, telephone){
		var query = new Parse.Query(UserParse);
        var curUser = UserParse.current();
		var curUsername = curUser.get('username');

		if(searchParam === curUsername){
			supersonic.ui.dialog.alert("Funny. Go highfive yourself");
			return;
		}

		var searchField = (telephone) ? 'phone' : 'username';

		//TODO: check current friends list first
		query.equalTo(searchField, searchParam);

		query.find()
		.then(function(receiver){
			if(receiver.length === 0){
				cb("No user found");
			} else {
				receiver = receiver[0];
	        	supersonic.logger.log("Found user. Sending request");

				curUser.relation('friends').add(receiver);
				curUser.save().then(function(){
					supersonic.logger.log('Added new friend');
				});

	        	var request = {
	        		status : 'sent',
	        		sender : curUser.id,
	        		senderName : curUsername,
	        		receiver : receiver.id
	        	};

	        	var newRequest = new FriendRequest(request);
	        	newRequest.save()
	        	.then(function(){
	        		supersonic.logger.log('Friend request sent');
					cb(null);
				});
			}

			
		}, function(error) {
			supersonic.logger.log("Didn't find user");
			cb(error);
		});
	};

	service.acceptFriendRequest = function(request) {
		receiver = UserParse.current();
		query = new Parse.Query(Parse.User);
		query.equalTo("objectId", request.sender);
		query.find({
			success: function(sender){
				supersonic.logger.log("Found sender... Accepting request");
				UserParse.current().relation('friends').add(sender);
				UserParse.current().save().then(function(){
					supersonic.logger.log('Receiver saved!');
				});
			},
			error: function(error){
				supersonic.logger.log("Could not find sender!");
			}
		});
		request['status'] = 'accepted';
		request.save().then(function(){
			supersonic.logger.log('Friend request has been accepted!');
		});

	};

	service.rejectFriendRequest = function(request) {
		request.set('status', 'rejected');
		request.save().then(function(request){
			supersonic.logger.log("I don't want to be friends!");
		}, function(error){
			supersonic.logger.log("Rejection failed!");
		});
	};

	service.loadFriendRequests = function(cb){
		var query = new Parse.Query(FriendRequestParse);

		//TODO: check current friends list first
		query.equalTo('receiver', UserParse.current().id);
		query.equalTo('status', 'sent');
		query.find()
		.then(function(friendRequests){
			supersonic.logger.log('Retrieved friend requests: ' + friendRequests.length);
			cb(null, friendRequests);
		}, function(error) {
			supersonic.logger.log("Didn't find user");
			cb(error, null);
		});
	};

/************* HANDLE FRIENDs *********************/

	service.loadFriends = function(cb){
		UserParse.current().relation('friends').query().find()
		.then(function(friends){
			supersonic.logger.log("Retrieved friends: " + friends.length);
			cb(friends);
		});

	};

	service.loadUsers = function(cb){
		var query = new Parse.Query(UserParse);
	    query.find()
	    .then(function(users) {
	        supersonic.logger.info("Successfully retrieved " + users.length + " users.");
	        cb(null, users);
	    },function(error) {
	        supersonic.logger.info("Error: " + error.code + " " + error.message);
	        cb(error, null);
	    });
	};


	return service;
});
