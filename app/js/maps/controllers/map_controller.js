
 /* eslint-disable prefer-arrow-callback */

module.exports = function(app) {

  app.controller('mapController', function(NgMap) {

    console.log(NgMap);
    var vm = this;
    vm.positions = [];

    NgMap.getMap().then(function(map) {
      console.log('map', map);
      vm.map = map;
    });

    vm.shops = [
    { id: 'foo', name: 'FOO SHOP', position: [41, -87] },
    { id: 'bar', name: 'BAR SHOP', position: [42, -86] }
    ];
    vm.shop = vm.shops[0];

    vm.showDetail = function(e, shop) {
      vm.shop = shop;
      vm.map.showInfoWindow('foo-iw', shop.id);
    };

    vm.hideDetail = function() {
      vm.map.hideInfoWindow('foo-iw');
    };


  });
};
