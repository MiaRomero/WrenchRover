module.exports = function(app) {
  app.directive('oilList', function() {
    return {
      restrict: 'EAC',
      replace: true,
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/oil_list.html',
      scope: {
        oillist: '='
      },

      link: function(scope, element, attrs, controller) {
      }
    };
  });
};
