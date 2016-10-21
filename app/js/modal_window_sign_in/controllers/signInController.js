
module.exports = function(app) {
  app.controller('signInController', function($uibModalInstance) {
    console.log('modal controller open');
    console.log($uibModalInstance);
    var $ctrl = this;
    console.log($uibModalInstance);

    $ctrl.ok = function() {
      console.log('okay, then');
      $uibModalInstance.close();
    };

    $ctrl.cancel = function() {
      console.log('cancelling');
      $uibModalInstance.dismiss('cancel');
    };

  });


};
