module.exports = function(app) {
  app.directive('firstLevelChildren', function($compile) {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/first_level_children.html',
      scope: {
        firstchild: '='
      },

      link: function(scope, element, attrs, controller) {
        scope.storeSelection = controller.storeSelection;

      }
    };
  });
};
