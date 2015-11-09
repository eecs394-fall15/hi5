angular
.module('common')
.factory('Requests', function(supersonic, User, UserParse, Highfive, HighfiveParse, Parse, FriendRequest, FriendRequestParse){
	var service = {};
	var curUserFriends = null;


/************* HANDLE HIGHFIVES *********************/

	service.loadHighfives = function(cb){
		var query = new Parse.Query(HighfiveParse);

      	query.equalTo("opened", false);
      	query.equalTo("receiver", UserParse.current().id)

      	query.find()
      	.then(function(highfives) {
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
	        })
		}, function(error) {
			supersonic.logger.log("Didn't find user");
			cb(error);
		});
	};

	service.loadFriendRequests = function(cb){
		var query = new Parse.Query(FriendRequestParse);

		//TODO: check current friends list first
		query.equalTo('receiver', UserParse.current().id);
		query.find()
		.then(function(friendRequests){
			supersonic.logger.log('Retrieved friend requests: ' + friendRequests.length);
			cb(null, friendRequests);
		}, function(error) {
			supersonic.logger.log("Didn't find user");
			cb(error, null);
		});
	};

	service.acceptFriendRequest = function(friendRequest, cb){
		var friendID = friendRequest.get('sender');
		UserParse.current().relation("friends").add(friendID)
		UserParse.current().save();
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