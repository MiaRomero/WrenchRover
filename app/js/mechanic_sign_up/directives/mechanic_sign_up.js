module.exports = function(app) {
  app.directive('mechanicSignUpForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      controller: 'mechanicSignUpController',
      controllerAs: 'scctrl',
      transclude: true,
      templateUrl: '/templates/mechanic_sign_up/directives/mechanic_sign_up_form.html',

      scope: {
        servicecenter: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        console.log('controller: ', controller);
        console.log('scope:', scope);
        var actions = {
        //   update: controller.updateMug,
          create: controller.createServiceCenter
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
