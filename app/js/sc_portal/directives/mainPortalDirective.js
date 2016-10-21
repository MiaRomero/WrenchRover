module.exports = function(app) {
  app.directive('mainPortalDirective', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      controller: 'scPortalController',
      controllerAs: 'portal',
      transclude: true,
      templateUrl: '/templates/sc_portal/directives/main_portal_directive.html',

      scope: {
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {

      }
    };
  });
};
