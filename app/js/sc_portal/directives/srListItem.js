module.exports = function(app) {
  app.directive('srListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      controller: 'scPortalController',
      controllerAs: 'portal',
      transclude: true,
      templateUrl: '/templates/sc_portal/directives/sr_list_item.html',
      scope: {
        sr: '='
      },
      link: function(scope, element, attrs, controller) {
        // scope.remove = controller.removeMug;
      }
    };
  });
};
