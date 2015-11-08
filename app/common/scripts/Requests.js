angular
.module('common')
.factory('Requests', function(supersonic, User, UserParse, Highfive, HighfiveParse){
	var service = {};


	service.loadHifives = function(cb){
		var query = new Parse.Query(HighfiveParse);

		//set query params
      	query.equalTo("opened", false);
      	query.equalTo("receiver", UserParse.current().id)

      	query.find()
      	.then(function(highfives) {
			cb(highfives);
        },function(error) {
          supersonic.logger.info("Error: " + error.code + " " + error.message);
        });
	};

	service.loadFriends = function(user){

	};

	service.addFriend = function(user, newFriend){

	};

	service.markViewed = function(){

	}

	return service;
});