module.exports = exports = function(app) {
  app.directive('myVehicleSelect', function() {
    return {
      restrict: 'EAC',
      controller: 'VehicleInfoController',
      controllerAs: 'VehicleInfoController',
      templateUrl: '/templates/vehicle/vehicle_dropdown_selection.html',
      transclude: true,
      scope: {}
    };
  });
};
