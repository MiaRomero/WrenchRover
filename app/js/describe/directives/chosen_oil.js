module.exports = function(app) {
  app.directive('chosenOil', function() {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/chosen_oil.html',
      scope: {
        chosenoil: '='
      },
      link: function(scope, element, attrs, controller) {

      }
    };
  });
};
