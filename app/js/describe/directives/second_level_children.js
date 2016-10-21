module.exports = function(app) {
  app.directive('secondLevelChildren', function($compile) {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/second_level_children.html',

      scope: {

        secondchild: '='
      },
      link: function(scope, element, attrs) {


      }
    };
  });
};
