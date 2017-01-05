module.exports = exports = function(app) {
  app.directive('myVehicleSelect', () => {
    return {
      restrict: 'EAC',
      controller: 'VehicleInfoController',
      controllerAs: 'VehicleInfoController',
      templateUrl: '/templates/vehicle/directives/vehicle_dropdown_selection.html',
      transclude: true,
      scope: {
        buttonText: '@',
        click: '@'

      },
      link: function(scope, element, attrs, controller) {
        var clicks = {
          localStorage: controller.saveToLocalStorage
        };
        scope.save = clicks[scope.click];
      }
    };
  });
};
