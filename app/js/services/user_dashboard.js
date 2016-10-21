module.exports = exports = function(app) {
  app.factory('userDashboardResource', ['$http', 'wrHandleError', function($http, errorHandler) {
    var dashboardResource = function(userObject, errors) {
      this.user = userObject;
      this.errorsArray = errors;
      this.userUrl = 'https://wrenchroverapi.herokuapp.com/users/';
      this.quotesUrl = '';
    };

    dashboardResource.prototype.getUserInfo = function() {
      return $http.get(this.userUrl + this.user.id)
      .then( (res) => {
        this.user.userName = res.data.user_name;
        this.user.userEmail = res.data.user_email;
        this.user.userPhone = res.data.user_phone;
        this.user.userZip = res.data.user_zip;
        for (var i = 0; i < res.data.autos.length; i++) {
          this.user.autos.push(res.data.autos[i]);
        }
        var month = parseInt(res.data.created_at.slice(5, 7), 10);
        var year = res.data.created_at.slice(0, 4);
        var monthsArray = ['January', 'February', 'March', 'April', 'May',
                          'June', 'July', 'August', 'September', 'October',
                          'November', 'December'];
        this.user.memberSince = monthsArray[month - 1] + ' ' + year;
      });
    };

    // dashboardResource.prototype.saveNewVehicleInfo = function() {
    // POST new vehicle object to database
    // };

    // dashboardResource.prototype.deleteVehicle = function() {
    // DELETE vehicle object from database
    // }

    // dashboardResource.prototype.getUserServiceQuotes = function() {
    //   return $http.get(this.quotesUrl + this.user.id)
    //   .then( (res) => {
    //     this.serviceQuotes = res.data;
    //   });
    // };

    return dashboardResource;
  }]);
};
