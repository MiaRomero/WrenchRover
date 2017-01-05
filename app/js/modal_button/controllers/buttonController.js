
module.exports = function(app) {
  app.controller('buttonController', ['$uibModal', '$log', '$document', '$http', function($uibModal, $log, $document, $http) {
    this.theCookie = navigator.cookieEnabled;
    console.log(this.theCookie);
    var that = this;

    this.open = function(parentSelector) {
      var parentElem = parentSelector ?
             angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

      var modalInstance = $uibModal.open({
        templateUrl: 'templates/modal/directives/modal_directive.html',
        controller: 'windowController',
        controllerAs: '$ctrl',
        appendTo: parentElem
      });

      modalInstance.result.then(() => {
        console.log('dismissed');
      }, () => {
        $log.info('Modal dismissed at: ' + new Date());
      });

      that.exit = function() {
        modalInstance.result.then(() => {
          console.log('dismissed');
        });
      };

    };


    // //////////


    // /////////


  }]);
};
