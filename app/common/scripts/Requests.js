angular
.module('common')
.factory('Requests', function(supersonic, User, UserParse, Highfive, HighfiveParse, Parse, FriendRequest, FriendRequestParse){
	var service = {};
	var curUserFriends = null;

	service.currentUser = UserParse.current();


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
	service.sendHighfive = function(receiver, hifiveType, cb){
			var highfive = {
              opened: false,
              receiver: receiver.id,
              sender: UserParse.current().id,
              senderName: UserParse.current().get('username'),
              type: 'highfive'
            };

            supersonic.logger.log(receiver.id);
            var newhighfive = new Highfive(highfive);
            newhighfive.save()
            .then(function(){
                supersonic.logger.info("Hi5 sent!");
            });
	};


	/**
	*	Set the highfive to viewed and save it
	*/
	service.viewHighfive = function(highfive, cb){

	};


/************* HANDLE FRIEND REQUESTS *********************/


	service.sendFriendRequest = function(username, cb){
		var query = new Parse.Query(UserParse);

		//TODO: check current friends list first
		query.equalTo('username', username);
		query.find()
		.then(function(receiver){
			receiver = receiver[0];
	        supersonic.logger.log("Found user. Sending request");
	        var curUser = UserParse.current();

					curUser.relation('friends').add(receiver);
					curUser.save().then(function(){
						supersonic.logger.log('Added new friend');
					});

	        var request = {
	        	status : 'sent',
	        	sender : curUser.id,
	        	senderName : curUser.get('username'),
	        	receiver : receiver.id
	        };

	        var newRequest = new FriendRequest(request);
	        newRequest.save()
	        .then(function(){
	        	supersonic.logger.log('Friend request sent');
				cb(null);
			});
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

	service.rejectFriendRequest = function(request, cb) {
		request.set('status', 'rejected');
		request.save().then(function(request){
			supersonic.logger.log("I don't want to be friends!");
			cb(request);
		}, function(error){
			supersonic.logger.log("Rejection failed!");
			cb(error);
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
		UserParse.current().get('friends').query().find()
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
