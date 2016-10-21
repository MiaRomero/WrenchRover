module.exports = function(app) {
  app.directive('serviceListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/service_centers/directives/service_list_item.html',
      scope: {
        servicecenter: '='
      },
      link: function(scope, element, attrs, controller) {
        // scope.remove = controller.removeMug;
      }
    };
  });
};
