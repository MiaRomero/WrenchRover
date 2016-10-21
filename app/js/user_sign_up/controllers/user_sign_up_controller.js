var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', '$http', function(Resource, $http) {


    this.users = [];
    this.errors = [];
    this.allProblems = null;
    this.previouslyEntered = localStorage.getItem('describeIssue');
    this.localStorageOil = localStorage.getItem('oilChosen');
    this.localStorageDash = localStorage.getItem('dashChosen');
    this.localStorageChosen = localStorage.getItem('chosen');
    this.serviceRequests = [];
    this.concatLS = function() {
      this.serviceRequests = this.previouslyEntered.concat(this.localStorageOil).concat(this.localStorageDash).concat(this.localStorageEntered);
      console.log(this.serviceRequests);
      this.allProblems = this.serviceRequests;
    };

    this.storedVehicle = JSON.parse(localStorage.getItem('vehicle'));

    var remote = new Resource(this.users, this.errors, baseUrl + 'users', { errMessages: { create: 'create error' } });

    this.auto = {
      year: this.storedVehicle.year,
      make: this.storedVehicle.make.name,
      model: this.storedVehicle.model.name,
      trim: this.storedVehicle.trim.name,
      engine: this.storedVehicle.engine,
      mileage: this.storedVehicle.mileage


    };
    this.createUser = function(resource) {
      this.x = {
        user: resource
      };
      console.log(this.x.user[resource]);
    //   this.x.user['autos'] = ['Dragula', 'Delta Flyer'];

      remote.create(this.x);
      $http.post(baseUrl + 'autos', this.auto)
    .then(
        (res) => {
          console.log(res);
          console.log(res.data.id);
        })
      .then(() => {
        // this.creating = true;
        console.log(this.newUser);
        this.newUser = null;
        // this.concatLS();
        //
        // console.log(this.serviceRequests);
        // var issue = this.serviceRequests;
        // $http.post(baseUrl + 'service_requests', { request_issue: issue });
      });


    }.bind(this);

  }

]);
};
