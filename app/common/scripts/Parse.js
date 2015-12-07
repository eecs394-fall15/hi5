angular
  .module('common')
  .factory('Parse', function () {
    Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY", "MASTER_KEY");
    return Parse;
});
