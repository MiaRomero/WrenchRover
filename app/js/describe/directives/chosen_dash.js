module.exports = function(app) {
  app.directive('chosenDash', function() {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/chosen_dash.html',
      scope: {
        chosendash: '='
      },
      link: function(scope, element, attrs, controller) {

      }
    };
  });
};
