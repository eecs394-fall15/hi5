
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


//Notifies user of FriendRequest
Parse.Cloud.afterSave("Highfive", function(request) {
	//request.object is the object being saved
	var highfive = request.object;
	var senderName = highfive.get('senderName');
	var pushQuery = new Parse.Query(Parse.Installation);
	var channels = [highfive.get('receiver')];

	pushQuery.equalTo('channels', channels);

	Parse.Push.send({
		where: pushQuery, // Set our Installation query
		data: {
		  alert: "New highfive from " + senderName,
		  senderName : senderName,
		  highfive : highfive
		}
		}, {
		success: function() {
		  // Push was successful
		},
		error: function(error) {
		  throw "Got an error " + error.code + " : " + error.message;
		}
	});
});



//Notifies user of FriendRequest
Parse.Cloud.afterSave("FriendRequest", function(request) {
	//request.object is the object being saved
  var senderName = request.object.get('senderName');

  var pushQuery = new Parse.Query(Parse.Installation);
  var channels = [request.object.get('receiver')];
  pushQuery.equalTo('channels', channels);

  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "Buddy Request from " + senderName,
      senderName: senderName
    }
  }, {
    success: function() {
      // Push was successful
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });
});



// Accept Friend request
Parse.Cloud.define("acceptFriendRequest", function(request, response) {
  Parse.Cloud.useMasterKey();

  var senderID = request.sender;
  var receiver = Parse.User.current();

  query = new Parse.Query(Parse.User);
  query.equalTo('objectId', senderID);

  query.find({useMasterKey: true})
  .then(function(res) {
    sender = res;
    receiver.relation('friends').add(sender);
    receiver.save().then(function() {
      console.log("Receiver saved.");
    });
    sender = new Parse.User(res);
    sender.relation('friends').add(receiver);
    // sender.save().then(function() {
    //   console.log("Sender saved.");
    // });
    response.success();
  },
  function(err) {
    response.error('Error');
  });
});
