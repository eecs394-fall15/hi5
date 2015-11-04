angular
  .module('login')
  .controller('IndexController', function($scope, supersonic) {
  	$scope.login = function () {
		var options = {
		   duration: .5,
		   curve: "easeInOut"
		}
			var animation = supersonic.ui.animate("slideFromLeft",options);
		supersonic.ui.initialView.dismiss(animation);
	}
  });
