angular
  .module('common')
  .factory('UserParse', function(Parse, ParseUtils) {
    var properties = ['username', 'password', 'email', 'friends', 'phone', 'address', 'emailVerified', 'firstName', 'lastName'];
    for (var i = 0; i < properties.length; i++) {
      ParseUtils.addSetterGetter(Parse.User, properties[i]);
    }
    return Parse.User;
});
