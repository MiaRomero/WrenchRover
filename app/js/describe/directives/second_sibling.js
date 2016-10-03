module.exports = function(app) {
  app.directive('secondSibling', function() {
    return {
      restrict: 'E',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/describe/directives/second_sibling.html',

      scope: {
        secondsibling: '='
      },
      link: function(scope, element, attrs) {
        // element.append('<p>kaeaega</p>');
        // console.log(scope);
      }
    };
  });
};