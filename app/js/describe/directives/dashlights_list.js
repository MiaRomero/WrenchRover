module.exports = function(app) {
  app.directive('dashLights', function() {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/dash_lights.html',
      scope: {
        dashlights: '='
      },
      link: function(scope, element, attrs, controller) {
        // scope.remove = controller.removeMug;
      }
    };
  });
};
