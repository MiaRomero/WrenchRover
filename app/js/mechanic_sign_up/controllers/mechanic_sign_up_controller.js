var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('mechanicSignUpController', ['wrResource', function(Resource) {
    this.servicecenters = [];
    this.errors = [];
    var remote = new Resource(this.servicecenters, this.errors, baseUrl + 'service_centers', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);

    this.createServiceCenter = function() {
      remote.create(this.newServiceCenter)
      .then(() => {
        this.newServiceCenter = null;
      });
    }.bind(this);
    // this.getAll();
  }]);
};
