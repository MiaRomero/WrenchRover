
module.exports = function(app) {

  app.component('modalDirective', {
    templateUrl: 'templates/modal/directives/modal_directive.html',
    bindings: {
    //   resolve: '<'
    //   close: '&',
    //   dismiss: '&'
    }

    // controller: function() {
    //   var $ctrl = this;
    //   $ctrl.ok = function() {
    //     $ctrl.close();
    //   };
    //
    //   $ctrl.cancel = function() {
    //     $ctrl.dismiss({ $value: 'cancel' });
    //   };
    // }

  });
};
