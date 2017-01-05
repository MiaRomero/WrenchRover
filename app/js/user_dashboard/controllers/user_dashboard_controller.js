 /* eslint-disable prefer-arrow-callback */
var baseUrl = require('../../config').baseUrl;
module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['$http', 'NgMap', 'string', '$state', function($http, NgMap, string, $state) {

    this.key = string;
    var vm = this;
    vm.positions = [];
    var loc_obj = {};

    var map_icons = [ '../../../images/map_icons/number_1.png',
      '../../../images/map_icons/number_2.png',
      '../../../images/map_icons/number_3.png', '../../../images/map_icons/number_4.png',
      '../../../images/map_icons/number_5.png', '../../../images/map_icons/number_6.png', '../../../images/map_icons/number_7.png',
      '../../../images/map_icons/number_8.png',
      '../../../images/map_icons/number_9.png',
      '../../../images/map_icons/number_10.png' ];


    NgMap.getMap().then(function(map) {
      vm.map = map;
    });


    var that = this;
    this.user_id = JSON.parse(localStorage.getItem('user_id'));
    console.log(this.user_id);
    this.arr = [];

    this.service_object_thing = null;

    this.service_requestObj = JSON.parse(localStorage.getItem('service_requests'));

    console.log(this.service_requestObj);
    this.service_request_id = JSON.parse(localStorage.getItem('service_request_id'));

    this.url = 'https://wrenchroverapi.herokuapp.com/';
    this.userObject = {};

    this.sq_object = [];
    this.sq_id = null;
    this.sr_id = null;
    this.service_quotes = [];
    this.service_quotes_table = [];
    this.avail_dates = [];
    this.user_dates = [];

    this.serviceQuotes = {
      user_id: this.user_id,
      quote_cost: '',
      quote_text: '',
      work_request: '',
      existence: 'maybe'
    };


    console.log(this.arr);
    this.errors = [];

    console.log(this.arr);
    console.log(this.service_object_thing);

    this.addRequest = function(x) {
      console.log(x);
      console.log('adding request');
      $state.go('common_repairs_view.get_started');
    };

    // /////
    this.getUserInfo = function() {
      console.log('initting the ud');
      this.user_id = JSON.parse(localStorage.getItem('user_id'));
      console.log(this.user_id);

      console.log(JSON.parse(localStorage.getItem('service_requests')));

      $http.defaults.headers.common.Authorization = localStorage.getItem('token');
      console.log(localStorage.getItem('token'));

      $http.get(this.url + 'users/' + this.user_id)
      .then((res) => {
        console.log(res);
        this.storedVehicle = {
          make: {
            name: res.data.autos[0].make
          },
          model: {
            name: res.data.autos[0].model
          },
          trim: {
            name: res.data.autos[0].trim
          },
          mileage: res.data.autos[0].mileage,
          id: res.data.autos[0].id,
          user_id: res.data.autos[0].user_id,
          year: res.data.autos[0].year
        };
        window.localStorage.vehicle = JSON.stringify(this.storedVehicle);

        window.localStorage.auto_id = this.storedVehicle.id;
        console.log(localStorage.getItem('token'));

        // dashboardResource.calculateMemberDate = function(res) {
        var month = parseInt(res.data.created_at.slice(5, 7), 10);
        var year = res.data.created_at.slice(0, 4);
        var monthsArray = ['January', 'February', 'March', 'April', 'May',
          'June', 'July', 'August', 'September', 'October',
          'November', 'December'];
        var memberDate = monthsArray[month - 1] + ' ' + year;
        console.log(memberDate);

        this.userObject.memberSince = memberDate;
        this.memberSince = memberDate;
        console.log(this.userObject.memberSince);

        this.userObject = res.data;
        console.log(this.userObject);
        // console.log(res.data.autos[0]);
        this.userObject.autos = res.data.autos;
        console.log(this.userObject.autos);

        console.log(res.data.service_requests[0].id);
        this.sr_id = res.data.service_requests[0].id;
        console.log(this.sr_id);
      })

      .catch((res) => {
        console.log(res);
        console.log('error is here');
      })

      .then(() => {
        console.log(this.sr_id);
        $http.get(this.url + 'service_requests/' + this.sr_id)
        .then((res) => {
          console.log(res.data);
          this.service_object_thing = res.data;
          console.log(res.data.service_quotes);
          if (res.data.service_quotes.length >= 1) {
            console.log(res.data.service_quotes[0].id);
            this.arr = res.data;
            console.log(this.arr);

            this.service_quotes = res.data.service_quotes;

            console.log(this.service_quotes);

            $http.get(this.url + 'service_quotes')
            .then((res) => {
              console.log(res.data);
              this.service_quotes_table.splice(0);
              console.log(this.service_request_id);
              console.log(this.sr_id);
              this.obj_quote = this.service_quotes_table[0];
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].service_request_id == this.sr_id) {

                  console.log(res.data[i]);
                  var loc_obj = { id: res.data[i].service_center.service_name, cost: res.data[i].quote_cost, notes: res.data[i].quote_text, available_date_1: res.data[i].available_date_1, available_date_2: res.data[i].available_date_2, available_date_3: res.data[i].available_date_3,
                    pos:

                     res.data[i].service_center.service_address + ', ' + res.data[i].service_center.service_city + ',' + res.data[i].service_center.service_state + ',' + res.data[i].service_center.service_zip, num: 'things',
                    quote_id: res.data[i].id,
                    cost: res.data[i].quote_cost,
                    notes: res.data[i].quote_text,
                    position: res.data[i].service_center.service_address + ', ' + res.data[i].service_center.service_city + ',' + res.data[i].service_center.service_state + ',' + res.data[i].service_center.service_zip,
                    dates: [ res.data[i].available_date_1, res.data[i].available_date_2, res.data[i].available_date_3]
                  };

                  this.user_dates.push(res.data[i].available_date_1, res.data[i].available_date_2, res.data[i].available_date_3);

                  vm.positions.push(loc_obj);
                  console.log(loc_obj);

                  console.log(vm.positions);

                  this.avail_dates.push(res.data[i].available_date_1, res.data[i].available_date_2, res.data[i].available_date_3);

                  this.service_quotes_table.push(res.data[i]);

                  console.log(this.avail_dates);
                //   return loc_obj;
                }
              }
              console.log(loc_obj);
              for (var j = 0; j < vm.positions.length; j++) {
                vm.positions[j].map_icon_pics = map_icons[j];
                vm.positions[j].item_number = j + 1;
              }

              console.log(vm.positions);

              console.log(vm.positions);
              console.log(vm.positions.length);

              vm.shop = vm.positions[0];
              console.log(vm.shop);

              vm.showDetail = function(e, shop) {
                console.log(shop);
                // console.log(shop.id);
                vm.shop = shop;
                vm.map.showInfoWindow('foo-iw', shop.id);
                console.log(vm.map);
              };

              vm.hideDetail = function() {
                vm.map.hideInfoWindow('foo-iw');
              };

              console.log(this.service_quotes_table);

              that.value = '';
              that.newValue = function(value, x) {
                console.log(value);
                // console.log(this.x);
                console.log(x);
              };

              this.service_quotes_all = this.service_quotes.concat(this.service_quotes_table);

              console.log(this.service_quotes_all);

              this.testConfirm = function() {
                console.log('testing confirm ');
                console.log(this.available_date);
              };

              this.available_date = 1;
              this.confirm = function(value, x, y) {
                console.log(this.available_date);
                console.log(value);
                console.log(x);
                console.log(y);
                this.sq_obj = y;
                this.sq_obj.accepted = this.available_date;
                console.log(this.sq_obj);
                console.log(this.sq_obj.id);
                console.log(window.localStorage.token);
                $http.put(this.url + 'service_quotes/' + x, this.sq_obj)
                .success((res) => {
                  console.log(res);
                });
              };

            });

          } else {
            console.log('nope');
          }


        });


      });
    };

  }


  ]);
};
