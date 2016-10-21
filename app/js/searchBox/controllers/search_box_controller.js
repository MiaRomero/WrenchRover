

module.exports = function(app) {
  app.controller('WindowCtrl', function($scope) {
    $scope.place = {};
    $scope.showPlaceDetails = function(param) {
      $scope.place = param;
    };
  });

  app.controller('SearchBoxController', ['$scope', '$timeout', 'uiGmapLogger', '$http', 'uiGmapGoogleMapApi'
    , function($scope, $timeout, $log, $http, GoogleMapApi) {
      $log.doLog = true;

      $scope.toggleMap = function() {
        $scope.searchbox.options.visible = !$scope.searchbox.options.visible;
      };

      GoogleMapApi.then(function(maps) {
        maps.visualRefresh = true;
        $scope.defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(47.617829, -122.192324),
      new google.maps.LatLng(40.66541, -74.31715));

      // /
        var geocodeAddress = function(address, callback) {
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode( { 'address': address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              callback(results[0].geometry.location);
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
            }
          });
        };
        // geocodeAddress('11011 NE 9th St', function(latLng) {
        //   console.log('1  ' + latLng.lat());
        //   console.log('2  ' + latLng.lng());
        //   console.log('x');
        // });
      // /
        geocodeAddress('93550', function(latLng) {
          console.log('1  ' + latLng.lat());
          console.log('2  ' + latLng.lng());
          console.log('x');
        });

        $scope.map.bounds = {
          northeast: {
            latitude: $scope.defaultBounds.getNorthEast().lat(),
            longitude: $scope.defaultBounds.getNorthEast().lng()
          },
          southwest: {
            latitude: $scope.defaultBounds.getSouthWest().lat(),
            longitude: -$scope.defaultBounds.getSouthWest().lng()

          }
        };
        $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
      });


      angular.extend($scope, {
        window: {
          show: false,
          options: {
            pixelOffset: { width: 0, height: -40 }
          },
          templateurl: 'window.tpl.html',
          templateparameter: {},
          closeClick: function() {
            $scope.window.show = false;
          }
        },
        map: {
          control: {},
          center: {
            latitude: 47.617829,
            longitude: -122.192324
          },
          zoom: 12,
          dragging: false,
          bounds: {},
          markers: [],
          idkey: 'place_id',
          events: {
            idle: function(map) {

            },
            dragend: function(map) {
          // update the search box bounds after dragging the map
              var bounds = map.getBounds();
              var ne = bounds.getNorthEast();
              var sw = bounds.getSouthWest();
              $scope.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
          // $scope.searchbox.options.visible = true;
            }
          }
        },
        searchbox: {
          template: 'searchbox.tpl.html',
      // position:'top-right',
          position: 'top-left',
          options: {
            bounds: {},
            visible: true
          },
      // parentdiv:'searchBoxParent',
          events: {
            places_changed: function(searchBox) {

              places = searchBox.getPlaces();


              if (places.length == 0) {
                return;
              }

              console.log(searchBox.getPlaces);
          // For each place, get the icon, place name, and location.
              newMarkers = [];
              var bounds = new google.maps.LatLngBounds();
              for (var i = 0, place; place = places[i]; i++) {
            // Create a marker for each place.
                var marker = {
                  idKey: i,
                  place_id: place.place_id,
                  name: place.name,
                  latitude: place.geometry.location.lat(),
                  longitude: place.geometry.location.lng(),
                  templateurl: 'window.tpl.html',
                  templateparameter: place,
                  events: {
                    click: function(marker) {
                      $scope.window.coords = {
                        latitude: marker.model.latitude,
                        longitude: marker.model.longitude
                      };
                      $scope.window.templateparameter = marker.model.templateparameter;
                      $scope.window.show = true;

                    }
                  }
                };
                newMarkers.push(marker);
                bounds.extend(place.geometry.location);
              }

              $scope.map.bounds = {
                northeast: {
                  latitude: bounds.getNorthEast().lat(),
                  longitude: bounds.getNorthEast().lng()
                },
                southwest: {
                  latitude: bounds.getSouthWest().lat(),
                  longitude: bounds.getSouthWest().lng()
                }
              };

              $scope.map.markers = newMarkers;
            }
          }
        }
      });
    }]);


// /
};
