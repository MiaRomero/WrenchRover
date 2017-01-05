
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('userSignUpController', ['wrResource', '$http', '$state', 'wrHandleError', '$q', function(Resource, $http, $state, wrError, $q) {
    console.log('user sign up controller open');

    this.users = [];
    this.errors = [];
    this.allProblems = null;

    this.previousItem;
    this.localStorageOil;
    this.localStorageDash;
    this.localStorageChosen;

    this.message = null;


    this.previouslyEntered = localStorage.getItem('describeIssue');
    this.localStorageOil = localStorage.getItem('oilChosen');
    this.localStorageDash = localStorage.getItem('dashChosen');
    this.localStorageChosen = localStorage.getItem('chosen');

    var arr = [this.previouslyEntered, this.localStorageOil, this.localStorageChosen, this.localStorageDash];

    var arrFilter = arr.filter((z) => {
      return z != null;
    });

    console.log(arrFilter);

    this.storedVehicle = JSON.parse(localStorage.getItem('vehicle'));

    var remote = new Resource(this.users, this.errors, baseUrl + 'users', { errMessages: { create: 'create error' } });


    if (this.storedVehicle) {
      this.auto = {
        year: this.storedVehicle.year,
        make: this.storedVehicle.make.name,
        model: this.storedVehicle.model.name,
        trim: this.storedVehicle.trim.name,
        engine: this.storedVehicle.engine,
        mileage: this.storedVehicle.mileage,
        user_id: null,
        service_request_id: null
      };
      console.log(this.storedVehicle);
      console.log(this.auto);


    }


    this.serviceRequests = {
      user_id: null,
      work_request: null
    };
//  user sign up from landing page
    this.createUserAlt = function(resource) {
      console.log(resource);
      console.log('alternative');
      this.x = {
        user: resource
      };
      $http.post(baseUrl + 'users', this.x)
      .then((res) => {

        console.log(res);
        console.log(res.data);
        console.log(res.data.id);
        console.log(res.data.user_email);
        // console.log(config);
        // this.auto.user_id = res.data.id;
        window.localStorage.user_id = res.data.id;
      })
      .then(() => {
        console.log(resource);
        $http.post(baseUrl + 'authenticate', resource)
      .then((res) => {

        console.log(res);
        res.config.headers.Authorization = res.data.auth_token;

        this.token = res.data.auth_token;
        $http.defaults.headers.common.Authorization = localStorage.getItem('token');
        window.localStorage.token = this.token;
        console.log($http.defaults.headers.common.Authorization);
      });
      });
    };

    this.addServiceRequests = function() {
      console.log('service requesting');
      this.previouslyEntered = localStorage.getItem('describeIssue');
      this.localStorageOil = localStorage.getItem('oilChosen');
      this.localStorageDash = localStorage.getItem('dashChosen');
      this.localStorageChosen = localStorage.getItem('chosen');

      var arr = [this.previouslyEntered, this.localStorageOil, this.localStorageChosen, this.localStorageDash];

      var arrFilter = arr.filter((z) => {
        return z != null;
      });
      console.log(arr);
      console.log(arrFilter);
      this.requests = [];
      for (var i = 0; i < arrFilter.length; i++) {
        if (Array.isArray(arrFilter[i])) {
          console.log(arrFilter[i]);
          this.requests = this.requests.concat(flatten(arrFilter[i]));
        } else this.requests.push(arrFilter[i]);
        console.log(arrFilter[i]);
      }

      this.serviceRequests.work_request = this.requests.toString();
      this.serviceRequests.user_id = localStorage.getItem('user_id');
      console.log(this.serviceRequests.user_id);
      this.serviceRequests.auto = {};
      this.serviceRequests.auto.id = localStorage.getItem('auto_id');

      console.log(this.serviceRequests);
      $http.post(baseUrl + 'service_requests', this.serviceRequests)
      .then((res) => {
        console.log(res);
      });
    };


// alt ends


    // user sign up via user flow

    this.createUser = function(resource) {
      console.log('original');
      console.log(resource);
      this.requests = [];
      for (var i = 0; i < arrFilter.length; i++) {
        if (Array.isArray(arrFilter[i])) {
          this.requests = this.requests.concat(flatten(arrFilter[i]));
        } else this.requests.push(arrFilter[i]);
      }
      this.serviceRequests.work_request = this.requests.toString();
      console.log(this.serviceRequests);

      this.x = {
        user: resource
      };

      console.log(this.x);
      $http.post(baseUrl + 'users', this.x)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.id);
        console.log(res.data.user_email);
          // console.log(config);
        this.auto.user_id = res.data.id;
        this.serviceRequests.user_id = res.data.id;
        console.log(res.data.id);
        console.log(this.serviceRequests);

        window.localStorage.user_id = res.data.id;
      })
      .then(() => {
        $http.post(baseUrl + 'authenticate', resource)
        .then((res) => {

          console.log(res);
          console.log(res.data.auth_token);

          res.config.headers.Authorization = res.data.auth_token;
          this.token = res.data.auth_token;


          console.log(this.token);
          window.localStorage.token = this.token;
          $http.defaults.headers.common.Authorization = localStorage.getItem('token');


          console.log($http.defaults.headers.common.Authorization);
        })

     .catch((error, status) => {
       console.log('error');
       this.data.error = { message: error, status: status };
       console.log(this.data.error.status);
     })
        .then(() => {
          console.log(this.serviceRequests);
          $http.post(baseUrl + 'service_requests', this.serviceRequests)
          .then((res) => {
            console.log(res);
            window.localStorage.service_requests = JSON.stringify(res.data.work_request);
            this.auto.service_request_id = res.data.id;
            window.localStorage.service_request_id = res.data.id;
            console.log(localStorage.getItem('service_requests'));
            console.log(this.auto.service_request_id);
            console.log(res.data.id);
          })

          .then(() => {
            console.log('auto ing');
            console.log(this.auto);
            $http.post(baseUrl + 'autos', this.auto)
            .then((res) => {
              console.log(res);
              console.log(this.auto);

              console.log(window.localStorage.service_requests);

              this.srthing = JSON.parse(localStorage.getItem('service_requests'));
              console.log(this.srthing);

            });
          })
          .then(() => {
            console.log('after autos');
            this.message = 'Thank you for signing up!';
            console.log(JSON.parse(localStorage.getItem('service_requests')));
            $state.go('user_dashboard');
          });
        });

      });


    }.bind(this);

    this.logIn = function(resource) {
      console.log(this.login.user_email);

      $http.post(baseUrl + 'authenticate', resource)
      .then((res) => {
        console.log(res);
        // console.log(config);
        // console.log(headers);
        // this.message = 'Welcome back! Taking you to your dashboard now!';
        res.headers.Authorization = res.data.auth_token;
        this.token = res.data.auth_token;
        $http.defaults.headers.common.Authorization = this.token.toString();
        console.log($http.defaults.headers.common.Authorization);
        //
        window.localStorage.token = this.token;
        //
        window.localStorage.user_id = res.data.user_id;

        // console.log(resource);
        // console.log(resource.user_email);
        // console.log(this.login.user_email);
        this.signedInUser = resource.user_email;
        // var x = data.user_id.toString();
        this.user_id = res.data.user_id;

        $http.get(baseUrl + 'users/' + this.user_id )
        .then((res) => {

          console.log(this.signedInUser);
          if (res.data.service_requests.length !== 0 && res.data.autos.length !== 0) {
            window.localStorage.service_requests = JSON.stringify(res.data.service_requests[0]);
          } else {

            console.log('no requests or saved cars');
            this.message = "Are you sure you're not a mechanic?";
          }
        })
      .then((res) => {
        console.log(res);
        if (localStorage.getItem('service_requests')) {
          $state.go('user_dashboard');
        } else {
          console.log('Should go to mechanic');
        }
      });
      })
      .catch((res) => {
        this.message = 'Sorry, either your email or your password was wrong. Try again.';
      });


    };

    this.logout = function() {
      console.log('logging out');
      $http.defaults.headers.common.Authorization = '';
    };

  }]);
};
