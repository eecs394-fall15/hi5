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
              senderName: UserParse.current().name,
              type: 'highfive'
            };
   			console.log(receiver);

            supersonic.logger.log(receiver.id);
            var newhighfive = new Highfive(highfive);
            newhighfive.save()
            .then(function(){
                supersonic.logger.info("Hi5 sent!");
            });
	}


	service.loadFriends = function(cb){
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

	service.addFriend = function(user, newFriend){

	};

	service.markViewed = function(){

	}

	return service;
});