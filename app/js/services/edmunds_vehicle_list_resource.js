module.exports = exports = function(app) {
  app.factory('edmundsVehicleListResource', ['$http', 'wrHandleError', function($http, errorHandler) {
    var Resource = function(vehicleObject, vehicleListOptions, errors) {
      this.vehicle = vehicleObject;
      this.vehicleListOptions = vehicleListOptions;
      this.errorsArray = errors;
      this.savedTrims = [];
      this.url = '/api/vehicleInfo/';
    };

    Resource.prototype.getVehicleMakes = function() {
      return $http.get(this.url + this.vehicle.year)
      .then( (res) => {
        this.vehicleListOptions.makeList = res.data;
      });
    };

    Resource.prototype.getVehicleModels = function() {
      return $http.get(this.url + this.vehicle.make.niceName +
                      '/' + this.vehicle.year)
      .then( (res) => {
        this.vehicleListOptions.modelList = res.data;
      });
    };

    Resource.prototype.getVehicleTrims = function() {
      return $http.get(this.url + this.vehicle.make.niceName + '/' +
                      this.vehicle.model.niceName + '/' + this.vehicle.year)
      .then( (res) => {
        this.savedTrims = res.data.slice(0);
        for (var j = 1; j < res.data.length; j++) {
          if (res.data[j].name === res.data[j - 1].name) {
            res.data.splice(j, 1);
          }
        }
        this.vehicleListOptions.trimList = res.data;
      });
    };

    Resource.prototype.getVehicleEngines = function() {

      var optionsArray = this.savedTrims;
      this.vehicleListOptions.engineList = [];
      for (var i = 0; i < optionsArray.length; i++) {
        if (optionsArray[i].name === this.vehicle.trim.name && optionsArray[i].engine) {
          this.vehicleListOptions.engineList.push(optionsArray[i].engine);
        }
      }
      if (this.vehicleListOptions.engineList.length === 0) {
        this.vehicleListOptions.engineList.push('N/A');
      }
      if (this.vehicleListOptions.engineList.length > 1) {
        this.vehicleListOptions.engineList.sort();
        this.vehicleListOptions.engineList.push('Not Sure');
      }
      console.log(this.vehicle);
    };

    Resource.prototype.getVin = function() {
      return $http.get(this.url + 'vin/vin/vin/' + this.vehicle.vin)
      .then( (res) => {
        this.vehicle.year = res.data.year;
        this.vehicle.make = res.data.make;
        this.vehicle.model = res.data.model;
        this.vehicle.trim = res.data.trim;
        if (res.data.engine) this.vehicle.engine = res.data.engine;
        console.log(this.vehicle);
      });
    };

    return Resource;
  }]);
};
