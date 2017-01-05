module.exports = exports = function(app) {
  app.factory('userDashboardResource', ['$http', 'wrHandleError', function($http, errorHandler) {
    var dashboardResource = function(userObject, serviceQuotes, quoteArr, thing, errors) {


      this.user = userObject;
      this.quotes = serviceQuotes;
      this.errorsArray = errors;
      this.userUrl = 'https://wrenchroverapi.herokuapp.com/users/';
      this.requestUrl = 'https://wrenchroverapi.herokuapp.com/service_requests/';
      this.quotesUrl = 'https://wrenchroverapi.herokuapp.com/service_quotes/';
      console.log(this.quotes);
      this.arrQuotes = quoteArr;
      console.log(this.arrQuotes);
    //   this.sq_id = thing;

      console.log(this.sq_id);
    };

    this.sq_id = null;
    this.sr_id = null;


    dashboardResource.prototype.getUserInfo = function() {
      console.log('get user info');
      return $http.get(this.userUrl + this.user.id)
      .then( (res) => {
        console.log(res.data);
        this.user.userName = res.data.user_name;
        this.user.userEmail = res.data.user_email;
        this.user.userPhone = res.data.user_phone;
        this.user.userZip = res.data.user_zip;
        for (var i = 0; i < res.data.autos.length; i++) {
          this.user.autos.push(res.data.autos[i]);
        }
        console.log(this.user.autos);
        console.log(this.user.autos[0].service_request_id);
        // console.log(res.data.autos[0]);
        // this.user.auto_id = res.data.autos[0].id;
        this.user.service_request_id = res.data.autos[0].service_request_id;
        this.user.memberSince = dashboardResource.calculateMemberDate(res);
      })
    .then(() => {
      $http.get('https://wrenchroverapi.herokuapp.com/service_requests/' + this.user.service_request_id)
      .then((res) => {

        if (res.data.service_quotes[0] != undefined) {
          console.log(res.data.service_quotes[0].id);
        //   this.sq_id = res.data.service_quotes[0].id;
          dashboardResource.prototype.getQuoteInfo(this.sq_id);
          window.localStorage.sq_id = res.data.service_quotes[0].id;

        } else {
          this.sq_id = '';
          console.log('no quote');
        }

      });
    });
    };

    dashboardResource.prototype.getQuoteInfo = function() {
    //   this.sq_id = localStorage.getItem('sq_id');
    //   console.log(this.sq_id);
      console.log('get quote info');
    //   console.log(this.sq_id);
      console.log(localStorage.getItem('sq_id'));
      return $http.get('https://wrenchroverapi.herokuapp.com/service_quotes/' + localStorage.getItem('sq_id'))
      .then( (res) => {
        console.log(res.data);
        this.arrQuotes.splice(0);
        for (var i = 0; i <= res.data.length; i++) {
          this.arrQuotes.push(res.data[i]);
        }
        console.log(this.arrQuotes);

        this.quotes.quote_text = res.data.quote_text;
        this.quotes.quote_cost = res.data.quote_cost;
        this.quotes.service_request = res.data.service_request.work_request;
        console.log(this.quotes.quote_text);


      });
    };


    dashboardResource.calculateMemberDate = function(res) {
      var month = parseInt(res.data.created_at.slice(5, 7), 10);
      var year = res.data.created_at.slice(0, 4);
      var monthsArray = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'];
      var memberDate = monthsArray[month - 1] + ' ' + year;
      return memberDate;
    };

    // dashboardResource.getServiceRequestInfo = function(res) {
    //   var requestArray = res.data.service_requests;
    //   for (var i = 0; i < requestArray.length; i++) {
    //     var reqID = requestArray[i].id;
    //     return $http.get(this.requestUrl + reqID);
    //     // .then( (res) => {
    //     //
    //     // });
    //   }
    // };

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
