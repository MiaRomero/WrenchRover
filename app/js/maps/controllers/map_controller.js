require('angular');
require('angular-google-maps');
require('lodash');
// var lamePrompt = prompt('zip?');
// var lamePromptAddress = prompt('address?');

var startingAddressLat = [];
var startingAddressLng = [];
// console.log(lamePrompt);
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('WindowCtrl', function($scope) {
    $scope.place = {};
    $scope.showPlaceDetails = function(param) {
      $scope.place = param;
    };
  });

  app.controller('MapController', ['$scope', '$timeout', 'uiGmapLogger', '$http', 'uiGmapGoogleMapApi'
  , function($scope, $timeout, $log, $http, GoogleMapApi) {

    $scope.toggleMap = function() {
      $scope.searchbox.options.visible = !$scope.searchbox.options.visible;
    };


    GoogleMapApi.then(function(maps) {
      maps.visualRefresh = true;

      $scope.defaultBounds = new google.maps.LatLngBounds(
new google.maps.LatLng(47.82148, -122.66450),
new google.maps.LatLng(47.66541, -122.31715));

// new google.maps.LatLng(startingAddressLat[0], startingAddressLng[0]),
// new google.maps.LatLng(startingAddressLat[0] - .30, startingAddressLng[0] + .30));

    });

    $scope.map = {
      center: {
        latitude: 47.610326, longitude: -122.199138
      },

    //   center: {
    //     latitude: startingAddressLat[0], longitude: startingAddressLng[0]
    //   },

    //   center: {
    //     latitude: startingAddressLat[0], longitude: startingAddressLng[0]
    //   },
      zoom: 12,
      bounds: {} };
    console.log($scope.map.center);
    $scope.options = {
      scrollwheel: false
    };


    var latitude = [];
    var longitude = [];
    var place = [];

    console.log('lat: ' + latitude);


    var createMarker = function(i, bounds, idKey) {
/* eslint-disable no-eq-null*/
/* eslint-disable eqeqeq*/
      if (idKey == null) {
        idKey = 'id';
      }
      var ret = {
        latitude: latitude[i],
        longitude: longitude[i],
        place: place[i],
        title: 'm' + i,
        index: i + 1,
        show: false
      };

      ret[idKey] = i;
      return ret;
    };


    $scope.onClick = function(marker, eventName, model) {
      model.show = !model.show;
    };


    $scope.randomMarkers = [];

    $scope.$watch(

         () => {
           return $scope.map.bounds;
         }, (nv, ov) => {
      if (!ov.southwest && nv.southwest) {
        var markers = [];

        console.log(latitude);

        // /

        // /


        $http.get(baseUrl + '/service_centers')
                 .then((res) => {
                //    geocodeAddress(lamePromptAddress, function(latLng) {
                //      startingAddressLat.push(latLng.lat());
                //      startingAddressLng.push(latLng.lng());
                //      console.log(latLng.lng());
                //    });

                   for (var i = 0; i < res.data.length - 1; i++) {
                    //  console.log('i: ' + i);

                    //  if (res.data[i].service_zip == lamePrompt) {
                     console.log('i: ' + i);
                     place.push(res.data[i].service_name + '\n' + res.data[i].service_address + '\n' + res.data[i].service_city + '\n' + res.data[i].service_zip);
                     console.log(res.data[i].service_address, res.data[i].service_zip);

                     geocodeAddress(res.data[i].service_address + ', ' + res.data[i].service_city + ', ' + res.data[i].service_state, function(latLng) {

                       for (var j = 0; j < 5; j++) {

                         latitude.push(latLng.lat());
                         longitude.push(latLng.lng());
                         markers.push(createMarker(i, $scope.map.bounds));
                       }

                     }
                 );
                    //  }

                   }

                 }
             );


        $scope.randomMarkers = markers;


        var geocodeAddress = function(address, callback) {

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode( { 'address': address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              callback(results[0].geometry.location);
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
            }
            for (var i = 0; i < longitude.length - 1; i++) {
              markers.push(createMarker(i, $scope.map.bounds));
            }

          });


        };


      }
    }, true);

  }]);
};
