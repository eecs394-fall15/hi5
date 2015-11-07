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
