angular
.module('common')
.factory('Requests', function(supersonic, User, UserParse, Highfive, HighfiveParse){
	var service = {};


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
	}

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

	service.addFriend = function(username, cb){
		var query = new Parse.Query(UserParse);

		//TODO: check current friends list first

		query.equalTo('username', username);
		query.find()
		.then(function(user){
	        supersonic.logger.log("Found user");
			cb(null);
		}, function(error) {
			supersonic.logger.log("Didn't find user");
			cb(error);
		});
	};

	service.markViewed = function(){

	}

	return service;
});