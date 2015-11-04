angular
  .module('user')
  .controller("EditController", function ($scope, User, supersonic) {
    $scope.user = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    User.find(steroids.view.params.id).then( function (user) {
      $scope.$apply(function() {
        $scope.user = user;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.user.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
