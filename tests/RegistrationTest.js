describe('SignupController', function(){

  beforeEach(module('login'));

  var $controller;

    beforeEach(inject(function(_$controller_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
    }));

  it('should set "optional" to true', function() {
    var scope = {};
    var user = {
        username: 'validusername',
        password: 'validpassword1',
        password2: 'validpassword2'
      };

    var controller = $controller('SignupController', scope);
    expect(scope.validateUser(user)).toBe(0);
  });
});
