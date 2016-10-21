module.exports = function(app) {
  app.directive('commonRepairs', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/common_repairs/directives/common_repairs.html',

      scope: {
        problems: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        scope.oilDisplay = function() {
          console.log('yes you clicked it and things got bound!');


          if (scope.show === true) {
            scope.show = false;
          }
          else {
            scope.show = true;
          }
        };

        var elementResult = element[0].querySelectorAll('button');


        console.log(elementResult);


      }
    };
  });
};
