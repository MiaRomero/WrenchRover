module.exports = function(app) {
  app.directive('mechanicSignIn', [function() {
    return {
      restrict: 'EA',
      require: '^ngController',
      controller: 'mechanicSignUpController',
      controllerAs: 'scctrl',
      transclude: true,
      templateUrl: '/templates/mechanic_sign_up/directives/mechanic_sign_in.html',
      scope: {
        mech: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          create: controller.login
        };

        scope.save = actions[scope.action];

      }
    };
  }]);
};
