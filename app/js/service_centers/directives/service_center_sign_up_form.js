module.exports = function(app) {
  app.directive('serviceCenterSignUpForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/service_centers/directives/service_center_sign_up_form.html',

      scope: {
        servicecenter: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
        //   update: controller.updateMug,
          create: controller.createServiceCenter
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
