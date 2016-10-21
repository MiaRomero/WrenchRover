module.exports = function(app) {
  app.directive('chosenService', function() {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/chosen_service.html',
      scope: {
        chosenservice: '='
      },
      link: function(scope, element, attrs, controller) {
        // scope.remove = controller.removeMug;
      }
    };
  });
};
