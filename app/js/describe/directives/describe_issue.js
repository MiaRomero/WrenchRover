module.exports = function(app) {
  app.directive('describeIssue', function() {
    return {
      restrict: 'EAC',
      controller: 'describeController',
      controllerAs: 'describe',
      transclude: true,
      templateUrl: '/templates/describe/directives/describe_issue.html',

      scope: {
        description: '=',
        buttonText: '@',
        push: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          create: controller.describeIt
        };
        scope.save = actions[scope.action];
        scope.describeIt = controller.describeIt;
        scope.textAreaFunc = controller.textAreaFunc;
        scope.beginIt = controller.beginIt;
      }
    };
  });
};
