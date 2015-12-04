angular
  .module('hi5')
  .controller('ViewController', function($scope, supersonic, HighfiveData, HighfiveParse, Parse, Requests) {
      $scope.show = true;
      $scope.dataId = undefined;
      $scope.imgSrc = null;

      var animate = function() {
        setTimeout(function(){
          $(document).ready(function() {
            $(".highfive").animate({
              height: '100%',
              width: '100%'
            }, {
              speed: 6000,
              easing: "swing"
            });
          })
          supersonic.device.vibrate();
        }, 2000);
      }

      supersonic.ui.views.current.params.onValue( function (values) {
        $scope.dataId = values.id;
        var query = new Parse.Query(HighfiveParse);
        query.equalTo('objectId', $scope.dataId);
        query.find().then(function(highfives){
          var highfive = highfives[0];

          var tObj = JSON.parse(highfive['type']);
          var typeStr = tObj['type'];
          var subtypeStr = tObj['subtype'];

          supersonic.logger.log(HighfiveData[typeStr].subtypes[0].id)

          var subtypeData = HighfiveData[typeStr].subtypes.filter(function(val){
            return val['id'] === subtypeStr;
          });

          $scope.$apply(function() {
            $scope.imgSrc = subtypeData[0].imgSrc;
            supersonic.logger.log($scope.imgSrc);
          });

          animate();

        });
      });

      newBtn = new supersonic.ui.NavigationBarButton({
      });

      supersonic.ui.navigationBar.update({
        overrideBackButton: true,
      }).then(supersonic.ui.navigationBar.show());

      // supersonic.ui.views.current.params.onValue( function(params) {
      //   supersonic.logger.log(params['type']);
      //   var data = HighfiveData[params['type']].subtypes.filter(function(val, index, array) {
      //     return val.id === params.subtype;
      //   });
      //   $scope.apply(function(){
      //     supersonic.logger.log(data.imgSrc);
      //     $scope.imgSrc = data.imgSrc;
      //   });
      // });
  });
