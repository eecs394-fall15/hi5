angular
  .module('user')
  .controller("ProfileController", function ($scope, UserParse, RequestParse, supersonic, Parse, User) {
    $scope.user = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.isUser = false;

    supersonic.ui.views.current.whenVisible(function() {
      refresh();
      editBtn = new supersonic.ui.NavigationBarButton({
        onTap: $scope.edit,
        styleId: "nav-edit"
      });

      if ($scope.isUser) {
        supersonic.ui.navigationBar.update({
          title: user.username + "'s Profile",
          overrideBackButton: false,
          buttons: {
            right: [editBtn]
          }
        }).then(supersonic.ui.navigationBar.show());
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      if ($scope.dataId == UserParse.current().id) {
        $scope.isUser = true;
      }
      refresh();
    });

    var refresh = function(){
      var query = new Parse.Query(UserParse);
      query.equalTo("objectId", $scope.dataId);

      query.find().then(function(users) {
        $scope.$apply( function () {
          $scope.user = users[0];
          $scope.showSpinner = false;
        });
       },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    };

    $scope.logout = function(){
      UserParse.current().logOut();
    };

    $scope.upload = function() {
      options = {
        destinationType: "dataURL",
        quality: 50,
        allowEdit: true,
        targetWidth: 150,
        targetHeight: 150
      };

      supersonic.media.camera.getFromPhotoLibrary(options).then( function(result) {
        console.log("Uploading...");
        var fileData = "data:image/png;base64," + result;
        $scope.user.picture = fileData;
        $scope.user.save().then( function () {
          console.log("Upload successful!");
        });
      });
    };
  });
