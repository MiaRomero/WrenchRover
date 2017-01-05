    var baseUrl = 'https://wrenchroverapi.herokuapp.com/';
    module.exports = function(app) {
      app.factory('scCommService', ['$http', function($http) {


        return {

          addDates: function(x) {
            console.log(x);
            console.log(x[0], x[1], x[2]);
            console.log('adding dates');
            for (var i = 0; i < x.length; i++) {
              console.log(new Date(x[i]));
            //   this.arr.push(new Date(x[i]));
            }

          },
          createQuote: function(x, y, z, a, times) {
            // console.log(x, y, z);
            console.log(y);
            console.log(a);
            console.log(new Date(a[0]));
            console.log(times);

            this.quoteObj = x;
            console.log(x, y, z);


            this.quote_X = y;
            this.quote_X.user_id = x;


            function trimTheDate(date, item) {
              console.log(date, item);

              var convertedDate = new Date(a[item]);
              var trimDate = convertedDate.toString().slice(0, 10);
              return trimDate;
            }
            console.log(trimTheDate(a[0], 0));
            console.log(trimTheDate(a[1], 1));
            console.log(trimTheDate(a[2], 2));


            this.quote_X.available_date_1 = trimTheDate(a[0], 0) + ' at ' + times[0];


            this.quote_X.available_date_2 = trimTheDate(a[1], 1) + ' at ' + times[1];


            this.quote_X.available_date_3 = trimTheDate(a[2], 2) + ' at ' + times[2];


            this.quote_X.service_center_id = JSON.parse(localStorage.getItem('service_center_id'));
            this.quote_X.service_request_id = z;
            console.log(this.quote_X);
            $http.post(baseUrl + 'service_quotes', this.quote_X).
            success((config) => {
              console.log(config);
            });


          }
        };
      }]);

    };
