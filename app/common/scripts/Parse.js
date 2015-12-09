angular
  .module('common')
  .factory('Parse', function () {
    Parse.initialize("C0wnCmDHHdeHmxq5SodsGob7LglWYW5CTizRz187", "OcPnjW5iLoqY0N6RJG3n9Ff6UwFnXsQGbOh12ca3", "mgB8La1rQLY0ARVUJSgqflFwpyqDpMuRgPJsJt45");
    return Parse;
});
