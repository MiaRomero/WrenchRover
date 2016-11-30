
var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('scPortalController', ['$http', 'scCommService', function($http, scCommService) {
    this.initfunction = function() {
      console.log('iniTting the functions!!!!!');
    };

    this.mytime = new Date();
    console.log(this.mytime);
    this.ismeridian = true;

    // value.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) .replace(/(:\d{2}| [AP]M)$/, '');

    // this.timeChange = function(value, value2, value3) {
    //   console.log(value, value2, value3);
    //   console.log(value.toLocaleTimeString());
    //   console.log(value2.toLocaleTimeString());
    //   console.log(value3.toLocaleTimeString());
    // };

    this.timeChange = function(value, value2, value3) {
      console.log(value, value2, value3);
      console.log(value.toLocaleTimeString());
      console.log(value2.toLocaleTimeString());
      console.log(value3.toLocaleTimeString());
    };

    this.service = scCommService;

    this.servicerequests = [];
    this.workrequests = [];
    this.servicequotes = [];
    this.pastbids = [];
    this.acceptedbids = [];


    this.getAll = () => {
      $http.get(baseUrl + '/service_requests')
      .then((res) => {
        this.servicerequests = res.data;
        this.workrequests.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.workrequests.push(res.data[i]);
        }
      });
    };

    this.getQuotes = function() {
      $http.get(baseUrl + '/service_quotes')
      .then((res) => {
        console.log(res.data);
        this.servicerequests = res.data;
        this.servicequotes.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.servicequotes.push(res.data[i]);
        }
      });
    };

    var _this = this;
    this.activeDate = null;

    // this.selectedDates = [new Date().setHours(0, 0, 0, 0)];
    this.selectedDates = [];
    if (this.activeDate = null) {
    //   this.selectedDates.push(new Date().setHours(0, 0, 0, 0));
      this.selectedDates.push(new Date().toLocaleDateString);
    //   this.selectedDates.push('whatever');
      console.log('stuff');
      console.log(this.selectedDates);
    }
    this.type = 'individual';
    this.options = {
    //   startingDay: 1,
    //   minDate: new Date(),
      customClass: function(data) {
        if (_this.selectedDates.indexOf(data.date) > -1 && _this.selectedDates.length <= 3) {
          return 'selected';
        }
        return '';
      }
    };

    this.show2pickers = false;

    this.removeFromSelected = function(dt) {
      _this.selectedDates.splice(_this.selectedDates.indexOf(dt), 1);
    // / Need to change activeDate for datepicker to call customClass again
      _this.activeDate = dt;
    };


    this.addDates = function(value) {

      console.log(value);
      scCommService.addDates(value);
    };

    // this.quoteObj = {
    //   user_id: null,
    //   service_center_id: null,
    //   service_request_id: 169,
    //   quote_text: null,
    //   quote_cost: null
    // };

    // this.addDates = function(value) {
    //   console.log('adding dates');
    //   for (var i = 0; i < value.length; i++) {
    //     console.log(new Date(value[i]));
    //   }
    // };

        //   var h = d.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) .replace(/(:\d{2}| [AP]M)$/, '');

    // h.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    // i.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    // j.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    this.createQuote = function(x, y, z, d, e, f) {
      console.log('creating the quote');
      this.times = [];
      console.log(x);
      console.log(y);
      console.log(z);
      console.log(d, e, f );

      var h = d.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
      var i = e.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
      var j = f.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    //   var h = d.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) .replace(/(:\d{2}| [AP]M)$/, '');
    //   var i = e.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) .replace(/(:\d{2}| [AP]M)$/, '');
    //   var j = f.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) .replace(/(:\d{2}| [AP]M)$/, '');

    //   var h = d.toLocaleTimeString();
    //   var i = e.toLocaleTimeString();
    //   var j = f.toLocaleTimeString();
      this.times.push(h, i, j);
      console.log(this.times);
      console.log(d.toLocaleTimeString());
      console.log(e.toLocaleTimeString());
      console.log(f.toLocaleTimeString());
      console.log(this.selectedDates);
      console.log(this.quote_cost);

      scCommService.createQuote(x, y, z, this.selectedDates, this.times);
    };


    this.getPastBids = function() {
    //   this.service_request_id = JSON.parse(localStorage.getItem('service_request_id'));
      this.service_center_id = localStorage.getItem('service_center_id');
    //   this.token = localStorage.getItem('token');
      console.log(this.token);
      console.log(this.service_center_id);

      $http.get(baseUrl + '/service_quotes')
      .then((res) => {
        // console.log(res.data);
        this.pastbids.splice(0);
        this.acceptedbids.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          console.log('loop');
        //   console.log(res.data[i].service_center_id);
          if (res.data[i].service_center_id !== null && res.data[i].service_center_id == this.service_center_id) {
            console.log('yes');
            // console.log(res.data[i].service_center);

            console.log(this.pastbids);
            console.log(res.data[i]);
            this.pastbids.push(res.data[i]);
            console.log(this.pastbids);
            if (res.data[i].accepted != null) {
              console.log('not null');
              this.acceptedbids.push(res.data[i]);
            }

          }


          // //
        //   this.servicequotes.splice(0);
        //   for (var i = 0; i < res.data.length; i++) {
        //     this.servicequotes.push(res.data[i]);
        //   }

          // //

        //   console.log(this.service_request_id);
        }
      });
    // this.workrequests.splice(0);

    };
  }
  ]
  );
};
