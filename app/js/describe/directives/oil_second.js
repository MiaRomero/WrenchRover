module.exports = function(app) {
  app.directive('oilSecond', function() {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/oil_second.html',
      scope: {
        oilsecond: '='
      },

      link: function(scope, element, attrs, controller) {
        scope.oilSelected = controller.oilSelected;
        scope.checkSelected = controller.checkSelected;
      }
    };
  });
};
