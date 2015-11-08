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
