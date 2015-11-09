/**************************** Users **********************/

angular
  .module('common')
  .constant('User', supersonic.data.model('User'));

angular
  .module('common')
  .factory('UserParse', function(Parse, ParseUtils) {
    var properties = ['username', 'password', 'email', 'friends', 'phone', 'address', 'emailVerified', 'firstName', 'lastName'];
    for (var i = 0; i < properties.length; i++) {
      ParseUtils.addSetterGetter(Parse.User, properties[i]);
    }
    return Parse.User;
});


/**************************** FRIEND REQUESTS **********************/

angular
  .module('common')
  .constant('FriendRequest', supersonic.data.model('FriendRequest'));


angular
  .module('common')
  .factory('FriendRequestParse', function(Parse, ParseUtils) {
    var friendrequest = Parse.Object.extend("FriendRequest", {
      // Instance methods
    }, {
      // Class methods
    });

    var properties = ['status', 'receiver', 'sender', 'createdAt', 'updatedAt', 'ACL', 'senderName'];
    for (var i = 0; i < properties.length; i++) {
      ParseUtils.addSetterGetter(friendrequest, properties[i]);
    }

    return friendrequest;
});


/**************************** Hifives **********************/
angular
  .module('common')
  .constant('Highfive', supersonic.data.model('Highfive'));


angular
  .module('common')
  .factory('HighfiveParse', function(Parse, ParseUtils) {
    var highfive = Parse.Object.extend("Highfive", {
      // Instance methods
    }, {
      // Class methods
    });

    var properties = ['opened', 'receiver', 'sender', 'type', 'createdAt', 'updatedAt', 'ACL', 'senderName'];
    for (var i = 0; i < properties.length; i++) {
      ParseUtils.addSetterGetter(highfive, properties[i]);
    }

    return highfive;
});
