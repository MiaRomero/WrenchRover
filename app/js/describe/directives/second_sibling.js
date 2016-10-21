module.exports = function(app) {
  app.directive('secondSibling', function() {
    return {
      restrict: 'E',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/second_sibling.html',

      scope: {
        secondsibling: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.checkedSelected = controller.checkedSelected;

      }
    };
  });
};
