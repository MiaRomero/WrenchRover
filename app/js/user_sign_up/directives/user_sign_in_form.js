module.exports = function(app) {
  app.directive('userSignInForm', [function() {
    return {
      restrict: 'EA',
      require: '^ngController',
      controller: 'userSignUpController',
      controllerAs: 'userctrl',
      transclude: true,
      templateUrl: '/templates/user/directives/user_sign_in_form.html',
      scope: {
        xuser: '=',
        buttonText: '@',
        buttonLabel: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          create: controller.createUser
        };

        scope.save = actions[scope.action];
        console.log(scope.save);

      }
    };
  }]);
};
