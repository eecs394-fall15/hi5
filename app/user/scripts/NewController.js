angular
  .module('user')
  .controller("NewController", function ($scope, User, supersonic) {
    $scope.user = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newuser = new User($scope.user);
      newuser.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });