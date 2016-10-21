module.exports = function(app) {
  app.directive('oilFirstChildren', function() {
    return {
      restrict: 'EAC',
      replace: true,
    //   require: 'describeController',
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/oil_first_children.html',
      scope: {
        oilfirstchildren: '='
      },

      link: function(scope, element, attrs, controller) {
      }
    };
  });
};
