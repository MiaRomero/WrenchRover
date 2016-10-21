module.exports = exports = function(app) {
  app.factory('vicClearSelections', ['wrHandleError', function(errorHandler) {
    var ClearSelections = function(vehicleObject, vehicleListOptions, errors) {
      this.vehicle = vehicleObject;
      this.vehicleListOptions = vehicleListOptions;
      this.errorsArray = errors;
    };

    ClearSelections.prototype.newYearSelected = function() {
      this.vehicle.make = '';
      this.vehicleListOptions.makeList.splice(0);
      this.vehicle.model = '';
      this.vehicleListOptions.modelList.splice(0);
      this.vehicle.trim = '';
      this.vehicleListOptions.trimList.splice(0);
      this.vehicle.engine = '';
      this.vehicleListOptions.engineList.splice(0);
    };

    ClearSelections.prototype.newMakeSelected = function() {
      this.vehicle.model = '';
      this.vehicleListOptions.modelList.splice(0);
      this.vehicle.trim = '';
      this.vehicleListOptions.trimList.splice(0);
      this.vehicle.engine = '';
      this.vehicleListOptions.engineList.splice(0);
    };

    ClearSelections.prototype.newModelSelected = function() {
      this.vehicle.trim = '';
      this.vehicleListOptions.trimList.splice(0);
      this.vehicle.engine = '';
      this.vehicleListOptions.engineList.splice(0);
    };

    ClearSelections.prototype.newTrimSelected = function() {
      this.vehicle.engine = '';
      this.vehicleListOptions.engineList.splice(0);
    };

    return ClearSelections;
  }]);
};
